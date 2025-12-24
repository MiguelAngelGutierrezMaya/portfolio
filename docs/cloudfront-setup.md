# CloudFront CDN Configuration Guide

For optimal caching of S3 resources, using CloudFront (AWS's CDN) provides better performance and more caching options than S3 alone.

## Setting Up CloudFront for S3

### 1. Create a CloudFront Distribution

1. Open the CloudFront console
2. Click "Create Distribution"
3. Under "Origin Domain", select your S3 bucket
4. Configure the following settings:

#### Origin Settings:
- Origin Path: Leave empty or specify a subfolder
- Origin Access: Choose "Origin access control settings" for secure access
- OAC Settings: Create a new OAC

#### Cache Behavior Settings:
- Path Pattern: Default (*)
- Compress Objects: Yes
- Cache Policy: Create a new policy with:
  - Minimum TTL: 86400 (1 day)
  - Maximum TTL: 31536000 (1 year)
  - Default TTL: 86400 (1 day)
  - Enable cache compression
  - Headers to include in cache key: None (to maximize cache hit ratio)
  - Cookies to include in cache key: None
  - Query strings to include: None
- Origin Request Policy: CORS-S3Origin

### 2. Update S3 Bucket Policy

After creating the distribution, CloudFront provides a bucket policy that you need to apply to your S3 bucket to allow CloudFront access. Apply this policy in the S3 console under "Permissions" > "Bucket Policy".

### 3. Create Cache Behaviors for Different File Types

1. Go to your CloudFront distribution
2. Click on the "Behaviors" tab
3. Add behaviors with different cache settings for each file type:

| Path Pattern | Cache TTL | Example |
|--------------|-----------|---------|
| *.jpg, *.png, *.gif, *.webp, *.avif | 1 year | Minimum TTL: 31536000 |
| *.js, *.css | 1 week | Minimum TTL: 604800 |
| *.html | 1 hour | Minimum TTL: 3600 |
| *.ttf, *.woff, *.woff2 | 1 year | Minimum TTL: 31536000 |

### 4. Update Your Website URLs

Replace your S3 URLs with CloudFront URLs in your code:

```diff
- const PUBLIC_STORAGE_URL = "https://your-bucket.s3.amazonaws.com";
+ const PUBLIC_STORAGE_URL = "https://dxxxxxxxx.cloudfront.net";
```

### 5. Optional: Set up Custom Domain

1. Add an alternate domain name in CloudFront settings
2. Upload SSL certificate (either using AWS Certificate Manager or importing your own)
3. Create a CNAME record in your DNS pointing to your CloudFront distribution

## Benefits

- Global Content Delivery Network
- Better cache control
- HTTPS support with free certificates
- Edge computing capabilities
- DDoS protection
- Reduced S3 costs (for data transfer) 