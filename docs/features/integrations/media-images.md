---
sidebar_label: Media Images
sidebar_position: 2
---

# Media Images

Add images to your nodes via upload or URL paste.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="users" label="Users" default>

## For Users

The Images tab lets you attach images to any node - either by uploading files or pasting URLs from the web.

![Media Images Interface](/img/media-embed-images-headvroom.jpg)

### How to Access

1. **Click a node** to open the InfoPanel
2. **Click the Media tab**
3. **Click Images** sub-tab

### Two Ways to Add Images

**Option 1: Upload Files**

Drag and drop image files onto the upload zone, or click to browse your computer.

- Supported formats: JPEG, PNG, GIF, WebP, SVG
- Max file size: 50MB per file
- Multiple files supported
- Images stored securely in Headvroom

**Option 2: Paste Image URL**

Reference any public image on the web.

1. Copy an image URL from any website (right-click image → "Copy image address")
2. Paste the URL into the "Paste image URL..." field
3. Click **+ Add**

The image appears in your gallery immediately.

### Viewing Images

Click any thumbnail to open the **Lightbox** fullscreen viewer.

- Use arrow keys (← →) to navigate between images
- Press Escape or click outside to close
- Image counter shows current position (e.g., "2 / 4")

### Deleting Images

Hover over any image to reveal action buttons:

- **Eye icon** - View in Lightbox
- **Trash icon** - Delete image

Click the trash icon and confirm to remove.

### Important Notes

**URL images vs Uploaded images:**

- **Uploaded images** are stored in Headvroom - they're yours forever
- **URL images** reference external sources - if the source website removes the image or goes down, it won't display in Headvroom

For important images, upload them rather than pasting URLs.

</TabItem>
<TabItem value="developers" label="Developers">

## For Developers

Technical details for the Media Images feature.

### Data Model

Images are stored in the node's `content.files[]` array:

```typescript
interface FileItem {
  url: string;           // Supabase URL or external URL
  name: string;          // Filename or URL-derived name
  type: string;          // MIME type (e.g., "image/png") or "image/url"
  source: "upload" | "url";  // Distinguishes storage type
  size?: number;         // File size in bytes (upload only)
  path?: string;         // Supabase Storage path (upload only)
}
```

### Example Data

**Uploaded image:**
```json
{
  "url": "https://xxxxx.supabase.co/storage/v1/object/public/media/user-id/node-id/image.png",
  "name": "image.png",
  "type": "image/png",
  "source": "upload",
  "size": 245632,
  "path": "user-id/node-id/image.png"
}
```

**URL image:**
```json
{
  "url": "https://example.com/photo.jpg",
  "name": "photo.jpg",
  "type": "image/url",
  "source": "url"
}
```

### Storage

Uploaded images are stored in Supabase Storage:

- **Bucket:** `media`
- **Path pattern:** `{user_id}/{node_id}/{filename}`
- **RLS:** Users can only access their own files

### Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `MediaSection.tsx` | `components/panels/` | Main container, tab management, handlers |
| `FileUploadZone.tsx` | `components/media/` | Drag & drop upload interface |
| `ImageGallery.tsx` | `components/media/` | Grid display of images |
| `Lightbox.tsx` | `components/media/` | Fullscreen image viewer |

### Delete Behavior

| Image Type | Delete Action |
|------------|---------------|
| Uploaded | Removed from `content.files[]` AND deleted from Supabase Storage |
| URL | Removed from `content.files[]` only (nothing to delete externally) |

### Storage Bucket Setup

Ensure migration `004_storage_bucket.sql` has been run:

```sql
-- Creates the media bucket with proper RLS
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT DO NOTHING;

-- RLS policies for user-scoped access
CREATE POLICY "Users can upload to own folder"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own files"
ON storage.objects FOR SELECT
USING (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
USING (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);
```

</TabItem>
<TabItem value="agents" label="Agents">

## For Agents

Quick setup and validation for Media Images.

### Quick Test (No Setup Required)

URL paste works out of the box:

```bash
# 1. Open any node in Headvroom
# 2. Click Media tab → Images
# 3. Paste any image URL, e.g.:
#    https://picsum.photos/400/300
# 4. Click + Add
# 5. Verify image appears in gallery
# 6. Click image to open Lightbox
# 7. Delete image via trash icon
```

### Upload Setup

For file uploads, Supabase Storage must be configured:

```bash
# 1. Verify storage bucket exists
# In Supabase Dashboard → Storage
# Look for "media" bucket

# 2. If missing, run migration:
# SQL Editor → Execute:
# supabase/migrations/004_storage_bucket.sql

# 3. Test upload:
# - Drag any image onto upload zone
# - Should upload and appear in gallery
# - Check Supabase Storage → media bucket for file
```

### Validation Checklist

```bash
# URL Images
[ ] Paste URL → image appears in gallery
[ ] Click thumbnail → Lightbox opens
[ ] Arrow keys navigate between images
[ ] Escape closes Lightbox
[ ] Trash icon removes image from gallery

# Uploaded Images
[ ] Drag & drop → upload succeeds
[ ] Click to browse → file picker works
[ ] Multiple files → all upload
[ ] Large file (< 50MB) → uploads successfully
[ ] Delete → removed from gallery AND Supabase Storage
```

### Common Issues

| Symptom | Fix |
|---------|-----|
| Upload fails | Check Supabase Storage bucket exists with RLS policies |
| URL image doesn't load | Verify URL is publicly accessible (not behind auth) |
| Delete doesn't remove from Storage | Check RLS delete policy on storage.objects |
| Gallery empty after refresh | Verify node content is saving to database |

### Data Verification

```sql
-- Check images attached to a node
SELECT content->'files' FROM nodes WHERE id = 'node-uuid';

-- Check uploaded files in storage
SELECT name, created_at FROM storage.objects
WHERE bucket_id = 'media'
AND name LIKE 'user-uuid/%';
```

</TabItem>
</Tabs>
