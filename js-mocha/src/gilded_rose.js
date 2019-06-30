export const sulfurasItemName = 'Sulfuras, Hand of Ragnaros';
export const ticketItemName = 'Backstage passes to a TAFKAL80ETC concert';
export const agedBrieItemName = 'Aged Brie';
export const conjuredItemName = 'Conjured';
const maxQuality = 50;
const minQuality = 0;

const getStandardQualityChange = sellIn => (sellIn > 0 ? 1 : 2);

const getNewBrieQuality = (sellIn, quality) => quality + getStandardQualityChange(sellIn);

const getNewDefaultQuality = (sellIn, quality) => quality - getStandardQualityChange(sellIn);

const getNewConjuredQuality = (sellIn, quality) => quality - 2 * getStandardQualityChange(sellIn);

const getTicketQualityChange = sellIn => (sellIn <= 10 ? (sellIn <= 5 ? 3 : 2) : 1);

const getNewTicketQuality = (sellIn, quality) => (sellIn <= 0 ? 0 : quality + getTicketQualityChange(sellIn));

const updateItem = item => {
  const { name, quality, sellIn } = item;
  if (name === 'Sulfuras, Hand of Ragnaros') {
    return item;
  }
  const newQualityMethod = {
    [ticketItemName]: getNewTicketQuality,
    [agedBrieItemName]: getNewBrieQuality,
    [conjuredItemName]: getNewConjuredQuality,
  };
  // If the quality is already outside the boundaries, it needs to stay there. Therefore, calculate the new boundaries
  const actualMaxQuality = Math.max(maxQuality, quality);
  const acutalMinQuality = Math.min(minQuality, quality);
  const newQualityNoBoundaries = (newQualityMethod[name] || getNewDefaultQuality)(sellIn, quality);
  const newQuality = Math.max(Math.min(newQualityNoBoundaries, actualMaxQuality), acutalMinQuality);
  return {
    sellIn: sellIn - 1,
    name,
    quality: newQuality,
  };
};

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items = this.items.map(updateItem);
    return this.items;
  }
}
