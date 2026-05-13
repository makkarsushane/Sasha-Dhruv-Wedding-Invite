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

const keyedAssets = [
  {
    input: 'scripts/assets/ornate-arch-source.png',
    output: 'public/ornaments/ornate-arch.webp',
    key: 'magenta',
    maxWidth: 980,
  },
  {
    input: 'scripts/assets/lotus-ground-source.png',
    output: 'public/ornaments/lotus-ground.webp',
    key: 'magenta',
    maxWidth: 1500,
  },
  {
    input: 'scripts/assets/text-floral-sprig-source.png',
    output: 'public/ornaments/text-floral-sprig.webp',
    key: 'green',
    trim: true,
    maxWidth: 760,
  },
  {
    input: 'scripts/assets/text-leaf-vine-source.png',
    output: 'public/ornaments/text-leaf-vine.webp',
    key: 'green',
    trim: true,
    maxWidth: 760,
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

async function removeChromaKey(asset) {
  const image = sharp(asset.input).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const key = asset.key || 'magenta';

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const keyStrength = key === 'green'
      ? Math.min(1, Math.max(0, (green - Math.max(red, blue) - 46) / 96)) *
        Math.min(1, Math.max(0, (green - 122) / 100))
      : (() => {
          const minRedBlue = Math.min(red, blue);
          const redBlueDelta = Math.abs(red - blue);
          const magentaDominance = minRedBlue - green;
          return Math.min(1, Math.max(0, (magentaDominance - 58) / 118)) *
            Math.min(1, Math.max(0, (120 - green) / 92)) *
            Math.min(1, Math.max(0, (132 - redBlueDelta) / 118));
        })();

    if (keyStrength >= 0.5 || (key === 'magenta' && keyStrength > 0.28 && green < 72)) {
      data[index] = 0;
      data[index + 1] = 0;
      data[index + 2] = 0;
      data[index + 3] = 0;
      continue;
    }

    if (keyStrength > 0) {
      data[index + 3] = Math.round(data[index + 3] * (1 - keyStrength));

      const despill = keyStrength * 0.5;
      if (key === 'green') {
        data[index + 1] = Math.round(green - Math.max(0, green - Math.max(red, blue)) * despill);
      } else {
        data[index] = Math.round(red - Math.max(0, red - green) * despill);
        data[index + 2] = Math.round(blue - Math.max(0, blue - green) * despill);
      }

      if (data[index + 3] < 36) {
        data[index] = 0;
        data[index + 1] = 0;
        data[index + 2] = 0;
        data[index + 3] = 0;
      }
    }
  }

  let output = sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  });

  if (asset.trim) {
    output = output.trim({
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      threshold: 8,
    });
  }

  await output
    .resize({
      width: asset.maxWidth,
      withoutEnlargement: true,
    })
    .webp({
      quality: 84,
      alphaQuality: 88,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(asset.output);
}

await Promise.all([
  ...assets.map(bakeAsset),
  ...keyedAssets.map(removeChromaKey),
]);
