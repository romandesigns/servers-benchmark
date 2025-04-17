# push-all.ps1

$USERNAME = "creativewebdev"
$REPO = "servers-benchmark"

$images = @{
  "bun-elysia"    = "servers-benchmark-bun-elysia"
  "bun-hono"      = "servers-benchmark-bun-hono"
  "dotnet-api"    = "servers-benchmark-dotnet-api"
  "node-fastify"  = "servers-benchmark-node-fastify"
  "node-express"  = "servers-benchmark-node-express"
}

Write-Host "🔐 Logging into Docker Hub..."
docker login
if ($LASTEXITCODE -ne 0) { exit 1 }

foreach ($tag in $images.Keys) {
  $local_image = $images[$tag]
  $remote_image = "${USERNAME}/${REPO}:${tag}"

  Write-Host "📦 Tagging image: $local_image -> $remote_image"
  docker tag $local_image $remote_image

  Write-Host "⏫ Pushing $remote_image to Docker Hub..."
  docker push $remote_image
}

Write-Host "✅ All images have been pushed successfully!"
