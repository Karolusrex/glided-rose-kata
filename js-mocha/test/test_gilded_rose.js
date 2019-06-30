import { expect } from 'chai';

import { Shop, Item, agedBrieItemName, ticketItemName, sulfurasItemName } from '../src/gilded_rose';

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

    it('Allows sellIn to go negative', () => {
      const gildedRose = new Shop([new Item('Aged Brie', -100, 10)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-103);
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
      const gildedRose = new Shop([new Item(agedBrieItemName, 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(11);
    });

    it('Modifies the sellIn date', () => {
      const gildedRose = new Shop([new Item(agedBrieItemName, 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
    });

    it('should increase twice as fast in quality when the sellIn date passes', () => {
      const gildedRose = new Shop([new Item(agedBrieItemName, 1, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(13);
    });

    it('Cannot obtain a quailty above 50', () => {
      const gildedRose = new Shop([new Item(agedBrieItemName, 1, 49)]);
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
  describe('Tickets', () => {
    it('should increase in quality the older it gets, if above 10', () => {
      const gildedRose = new Shop([new Item(ticketItemName, 11, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(11);
    });

    it('Modifies the sellIn date', () => {
      const gildedRose = new Shop([new Item(ticketItemName, 11, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(10);
    });

    it('cannot have a quality above 50', () => {
      const gildedRose = new Shop([new Item(ticketItemName, 11, 49)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it('should increase twice as fast in quality if between 6 and 10 days inclusive', () => {
      const gildedRose = new Shop([
        new Item(ticketItemName, 10, 10),
        new Item(ticketItemName, 9, 10),
        new Item(ticketItemName, 8, 10),
        new Item(ticketItemName, 7, 10),
        new Item(ticketItemName, 6, 10),
        new Item(ticketItemName, 5, 10),
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
        new Item(ticketItemName, 5, 10),
        new Item(ticketItemName, 4, 10),
        new Item(ticketItemName, 3, 10),
        new Item(ticketItemName, 2, 10),
        new Item(ticketItemName, 1, 10),
        new Item(ticketItemName, 0, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(13);
      expect(items[1].quality).to.equal(13);
      expect(items[2].quality).to.equal(13);
      expect(items[3].quality).to.equal(13);
      expect(items[4].quality).to.equal(13);
      expect(items[5].quality).not.to.equal(13);
    });

    it('should drop to 0 after the concert', () => {
      const gildedRose = new Shop([new Item(ticketItemName, 1, 10), new Item(ticketItemName, 0, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
      expect(items[1].quality).to.equal(0);
    });
  });
  describe('Sulfuras', () => {
    it(`Doesn't change in quality`, () => {
      const gildedRose = new Shop([new Item(sulfurasItemName, 1, 80)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(80);
    });

    it(`Doesn't modify the sellIn date`, () => {
      const gildedRose = new Shop([new Item(sulfurasItemName, 1, 80)]);
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
