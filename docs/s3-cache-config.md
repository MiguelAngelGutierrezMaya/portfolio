# S3 Cache Configuration Guide

## Setting Cache Headers on S3 Objects

You can set cache control headers on your S3 objects either through the AWS console or AWS CLI:

### AWS Console Method:
1. Open the AWS S3 console
2. Navigate to your bucket
3. Select the object(s) to modify
4. Click on "Copy"
5. Inside the copy config, select the same object path
6. In metadata, select replace all existing metadata
7. Add the following metadata:
   - Key: `Cache-Control`
   - Value: `public, max-age=31536000, immutable`

### AWS CLI Method:
```bash
aws s3 cp s3://your-bucket/path/to/file.jpg s3://your-bucket/path/to/file.jpg \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable"
```

### For Multiple Files:
```bash
# For all .jpg files
aws s3 cp s3://your-bucket/ s3://your-bucket/ \
  --recursive \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*" \
  --include "*.jpg"
```

## Recommended Cache Settings by File Type

| Resource Type | Cache-Control Value | Explanation |
|---------------|---------------------|-------------|
| Images (.jpg, .png, .webp, .avif) | `public, max-age=31536000, immutable` | Year-long cache, won't revalidate |
| CSS/JS with versioning | `public, max-age=31536000, immutable` | Year-long cache |
| CSS/JS without versioning | `public, max-age=86400` | 1-day cache |
| HTML | `public, max-age=3600` | 1-hour cache |
| Fonts | `public, max-age=31536000, immutable` | Year-long cache |

## Best Practices
- Use versioned file names (example.123abc.jpg) for long cache times
- For files that change frequently, use shorter cache times
- Add `immutable` only to resources that truly won't change (or have versioned names) 