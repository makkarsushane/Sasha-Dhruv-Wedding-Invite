import sharp from 'sharp';

const assets = [
  {
    input: 'scripts/assets/floral-canopy-source.png',
    output: 'public/ornaments/floral-canopy.webp',
    saturation: 1.12,
    brightness: 1.035,
    shadow: {
      blur: 22,
      opacity: 0.08,
      offsetX: 0,
      offsetY: 20,
      color: { r: 87, g: 46, b: 26 },
    },
  },
  {
    input: 'scripts/assets/floral-corner-source.png',
    output: 'public/ornaments/floral-corner.webp',
    saturation: 1.1,
    brightness: 1.035,
    shadow: {
      blur: 18,
      opacity: 0.07,
      offsetX: 0,
      offsetY: 14,
      color: { r: 87, g: 46, b: 26 },
    },
  },
];

async function makeShadow(input, shadow) {
  const base = sharp(input).ensureAlpha();
  const { width, height } = await base.metadata();
  const alpha = await base
    .clone()
    .extractChannel('alpha')
    .blur(shadow.blur)
    .linear(shadow.opacity)
    .png()
    .toBuffer();

  const shadowLayer = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: shadow.color,
    },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer();

  return { shadowLayer, width, height };
}

async function bakeAsset(asset) {
  const original = await sharp(asset.input)
    .ensureAlpha()
    .modulate({
      saturation: asset.saturation,
      brightness: asset.brightness,
    })
    .png()
    .toBuffer();

  const { shadowLayer, width, height } = await makeShadow(asset.input, asset.shadow);

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: shadowLayer,
        left: asset.shadow.offsetX,
        top: asset.shadow.offsetY,
      },
      {
        input: original,
        left: 0,
        top: 0,
      },
    ])
    .webp({
      quality: 84,
      alphaQuality: 86,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(asset.output);
}

await Promise.all(assets.map(bakeAsset));
