import fs from 'fs';
import path from 'path';
import { z } from 'zod';

export const SetupStepSchema = z.object({
  name: z.string().min(1),
  text: z.string().min(1),
});

export const TroubleshootingItemSchema = z.object({
  issue: z.string().min(1),
  fix: z.string().min(1),
});

export const DeviceFrontmatterSchema = z.object({
  device: z.string().min(1),
  deviceSlug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  estimatedTime: z.string().min(1),
  difficulty: z.enum(['Easy', 'Moderate', 'Advanced']).default('Easy'),
  recommendedApp: z.string().min(1),
  image: z.string().min(1),
  focusKeyword: z.string().optional(),
  steps: z.array(SetupStepSchema).min(1),
  troubleshooting: z.array(TroubleshootingItemSchema).default([]),
});

export type SetupStep = z.infer<typeof SetupStepSchema>;
export type TroubleshootingItem = z.infer<typeof TroubleshootingItemSchema>;
export type DeviceFrontmatter = z.infer<typeof DeviceFrontmatterSchema>;

export interface DeviceSummary {
  device: string;
  deviceSlug: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  recommendedApp: string;
  image: string;
}

const SETUP_DIR = path.join(process.cwd(), 'content', 'setup');

/**
 * Robust YAML Frontmatter & MDX Content Parser
 */
function parseFrontmatterAndContent(fileContent: string): { frontmatter: Record<string, any>; content: string } {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: fileContent.trim() };
  }

  const rawYaml = match[1];
  const content = match[2].trim();
  const frontmatter: Record<string, any> = {};

  const lines = rawYaml.split(/\r?\n/);
  let currentKey: string | null = null;
  let currentArray: any[] | null = null;
  let currentItem: Record<string, any> | null = null;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Check array item continuation or start
    if (trimmed.startsWith('- ')) {
      const itemStr = trimmed.slice(2).trim();
      if (itemStr.includes(':')) {
        const colonIdx = itemStr.indexOf(':');
        const k = itemStr.slice(0, colonIdx).trim();
        let v = itemStr.slice(colonIdx + 1).trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        currentItem = { [k]: v };
        if (currentArray) {
          currentArray.push(currentItem);
        }
      } else {
        if (currentArray) {
          currentArray.push(itemStr);
        }
      }
      continue;
    }

    // Property within current array object (indented)
    if (currentItem && (line.startsWith('    ') || line.startsWith('  '))) {
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx > 0) {
        const k = trimmed.slice(0, colonIdx).trim();
        let v = trimmed.slice(colonIdx + 1).trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        currentItem[k] = v;
        continue;
      }
    }

    // Top-level key-value or array initialization
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();

      if (!value) {
        // Starts array or nested object
        currentKey = key;
        currentArray = [];
        frontmatter[key] = currentArray;
        currentItem = null;
      } else {
        // Simple value
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        frontmatter[key] = value;
        currentKey = null;
        currentArray = null;
        currentItem = null;
      }
    }
  }

  return { frontmatter, content };
}

/**
 * Returns summary list of all supported streaming devices
 */
export async function getAllDevices(): Promise<DeviceSummary[]> {
  if (!fs.existsSync(SETUP_DIR)) {
    return [];
  }

  const files = fs.readdirSync(SETUP_DIR).filter((f) => f.endsWith('.mdx'));
  const devices: DeviceSummary[] = [];

  for (const file of files) {
    const filePath = path.join(SETUP_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter } = parseFrontmatterAndContent(raw);
    const parsed = DeviceFrontmatterSchema.safeParse(frontmatter);

    if (parsed.success) {
      devices.push({
        device: parsed.data.device,
        deviceSlug: parsed.data.deviceSlug,
        title: parsed.data.title,
        description: parsed.data.description,
        estimatedTime: parsed.data.estimatedTime,
        difficulty: parsed.data.difficulty,
        recommendedApp: parsed.data.recommendedApp,
        image: parsed.data.image,
      });
    }
  }

  return devices;
}

/**
 * Returns full parsed content and validated frontmatter for a specific device slug
 */
export async function getDeviceContent(slug: string): Promise<{ frontmatter: DeviceFrontmatter; content: string } | null> {
  const filePath = path.join(SETUP_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, content } = parseFrontmatterAndContent(raw);
  const result = DeviceFrontmatterSchema.safeParse(frontmatter);

  if (!result.success) {
    console.error(`[Setup MDX Validation Error in ${slug}.mdx]`, result.error.format());
    return null;
  }

  return {
    frontmatter: result.data,
    content,
  };
}

