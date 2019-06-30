import { expect } from 'chai';

import { Shop, Item } from '../src/gilded_rose';

describe('Gilded Rose', () => {
  describe('Regular products', () => {
    it('should be able to add a basic item', () => {
      const gildedRose = new Shop([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal('foo');
    });

    it('should degrade quality after a day for each item', () => {
      const gildedRose = new Shop([new Item('foo', 10, 2), new Item('foo', 10, 3)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(1);
      expect(items[1].quality).to.equal(2);
    });

    it('should modify the sellIn date for each item', () => {
      const gildedRose = new Shop([new Item('foo', 5, 2), new Item('foo', 10, 3)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(4);
      expect(items[1].sellIn).to.equal(9);
    });

    it('can be added with a quality above 50', () => {
      const gildedRose = new Shop([new Item('foo', 1, 100)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(99);
    });
    it('should degrade quality twice as fast after the sellin date', () => {
      const gildedRose = new Shop([new Item('foo', 0, 4), new Item('foo', 1, 4)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
      expect(items[1].quality).to.equal(1);
    });

    it('cannot degrade quality below 0', () => {
      const gildedRose = new Shop([new Item('foo', 10, 3)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });
  });
  describe('Aged Brie', () => {
    it('should increase in quality the older it gets', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(11);
    });

    it('Modifies the sellIn date', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
    });

    it('should increase twice as fast in quality when the sellIn date passes', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 1, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(13);
    });

    it('Cannot obtain a quailty above 50', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 1, 49)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });
  });
  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    it('should increase in quality the older it gets, if above 10', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(11);
    });

    it('Modifies the sellIn date', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(10);
    });

    it('cannot have a quality above 50', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 49)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it('should increase twice as fast in quality if between 6 and 10 days inclusive', () => {
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10),
        new Item('Backstage passes to a TAFKAL80ETC concert', 9, 10),
        new Item('Backstage passes to a TAFKAL80ETC concert', 8, 10),
        new Item('Backstage passes to a TAFKAL80ETC concert', 7, 10),
        new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10),
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(12);
      expect(items[1].quality).to.equal(12);
      expect(items[2].quality).to.equal(12);
      expect(items[3].quality).to.equal(12);
      expect(items[4].quality).to.equal(12);
      expect(items[5].quality).not.to.equal(12);
    });

    it('should increase by three times if between 5 and 1 days inclusive', () => {
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10),
        new Item('Backstage passes to a TAFKAL80ETC concert', 4, 10),
        new Item('Backstage passes to a TAFKAL80ETC concert', 3, 10),
        new Item('Backstage passes to a TAFKAL80ETC concert', 2, 10),
        new Item('Backstage passes to a TAFKAL80ETC concert', 1, 10),
        new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(13);
      expect(items[1].quality).to.equal(13);
      expect(items[2].quality).to.equal(13);
      expect(items[3].quality).to.equal(13);
      expect(items[4].quality).to.equal(13);
      expect(items[5].quality).not.to.equal(13);
    });

    it('should drop to 0 after the convert', () => {
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', 1, 10),
        new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10),
      ]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
      expect(items[1].quality).to.equal(0);
    });
  });
  describe('Sulfuras, Hand of Ragnaros', () => {
    it(`Doesn't change in quality`, () => {
      const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 1, 49)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(49);
    });
    it(`Doesn't modify the sellIn date`, () => {
      const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 1, 49)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(1);
    });
  });
});
