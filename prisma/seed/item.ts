import * as Prisma from '@prisma/client'

export async function seed(prisma: Prisma.PrismaClient) {
  return prisma.item.createMany({
    data: items,
    skipDuplicates: true,
  })
}

const items = [
  { name: 'Crown of Insight', type: Prisma.ItemType.SPECIAL },
  { name: 'Dream Solvent', type: Prisma.ItemType.SPECIAL },
  { name: 'Dust of Azoth', type: Prisma.ItemType.SPECIAL },
  { name: 'Slime Concentrate', type: Prisma.ItemType.COMMON },
  { name: 'Slime Secretions', type: Prisma.ItemType.COMMON },
  { name: 'Slime Condensate', type: Prisma.ItemType.COMMON },
  { name: 'Ominous Mask', type: Prisma.ItemType.COMMON },
  { name: 'Stained Mask', type: Prisma.ItemType.COMMON },
  { name: 'Damaged Mask', type: Prisma.ItemType.COMMON },
  { name: 'Forbidden Curse Scroll', type: Prisma.ItemType.COMMON },
  { name: 'Sealed Scroll', type: Prisma.ItemType.COMMON },
  { name: 'Divining Scroll', type: Prisma.ItemType.COMMON },
  { name: 'Weathered Arrowhead', type: Prisma.ItemType.COMMON },
  { name: 'Sharp Arrowhead', type: Prisma.ItemType.COMMON },
  { name: 'Firm Arrowhead', type: Prisma.ItemType.COMMON },
  { name: 'Black Crystal Horn', type: Prisma.ItemType.COMMON },
  { name: 'Black Bronze Horn', type: Prisma.ItemType.COMMON },
  { name: 'Heavy Horn', type: Prisma.ItemType.COMMON },
  { name: 'Ley Line Sprout', type: Prisma.ItemType.COMMON },
  { name: 'Dead Ley Line Leaves', type: Prisma.ItemType.COMMON },
  { name: 'Dead Ley Line Branch', type: Prisma.ItemType.COMMON },
  { name: 'Chaos Core', type: Prisma.ItemType.COMMON },
  { name: 'Chaos Circuit', type: Prisma.ItemType.COMMON },
  { name: 'Chaos Device', type: Prisma.ItemType.COMMON },
  { name: 'Mist Grass Wick', type: Prisma.ItemType.COMMON },
  { name: 'Mist Grass', type: Prisma.ItemType.COMMON },
  { name: 'Mist Grass Pollen', type: Prisma.ItemType.COMMON },
  { name: "Inspector's Sacrificial Knife", type: Prisma.ItemType.COMMON },
  { name: "Agent's Sacrificial Knife", type: Prisma.ItemType.COMMON },
  { name: "Hunter's Sacrificial Knife", type: Prisma.ItemType.COMMON },
  { name: "Lieutenant's Insignia", type: Prisma.ItemType.COMMON },
  { name: "Sergeant's Insignia", type: Prisma.ItemType.COMMON },
  { name: "Recruit's Insignia", type: Prisma.ItemType.COMMON },
  { name: 'Golden Raven Insignia', type: Prisma.ItemType.COMMON },
  { name: 'Silver Raven Insignia', type: Prisma.ItemType.COMMON },
  { name: 'Treasure Hoarder Insignia', type: Prisma.ItemType.COMMON },
  { name: 'Energy Nectar', type: Prisma.ItemType.COMMON },
  { name: 'Shimmering Nectar', type: Prisma.ItemType.COMMON },
  { name: 'Whopperflower Nectar', type: Prisma.ItemType.COMMON },
  { name: 'Fossilized Bone Shard', type: Prisma.ItemType.COMMON },
  { name: 'Sturdy Bone Shard', type: Prisma.ItemType.COMMON },
  { name: 'Fragile Bone Shard', type: Prisma.ItemType.COMMON },
  { name: 'Famed Handguard', type: Prisma.ItemType.COMMON },
  { name: 'Kageuchi Handguard', type: Prisma.ItemType.COMMON },
  { name: 'Old Handguard', type: Prisma.ItemType.COMMON },
  { name: 'Chaos Oculus', type: Prisma.ItemType.COMMON },
  { name: 'Chaos Axis', type: Prisma.ItemType.COMMON },
  { name: 'Chaos Gear', type: Prisma.ItemType.COMMON },
  { name: 'Polarizing Prism', type: Prisma.ItemType.COMMON },
  { name: 'Crystal Prism', type: Prisma.ItemType.COMMON },
  { name: 'Dismal Prism', type: Prisma.ItemType.COMMON },
  { name: 'Spectral Nucleus', type: Prisma.ItemType.COMMON },
  { name: 'Spectral Heart', type: Prisma.ItemType.COMMON },
  { name: 'Spectral Husk', type: Prisma.ItemType.COMMON },
  { name: 'Concealed Talon', type: Prisma.ItemType.COMMON },
  { name: 'Concealed Unguis', type: Prisma.ItemType.COMMON },
  { name: 'Concealed Claw', type: Prisma.ItemType.COMMON },
  { name: 'Deathly Statuette', type: Prisma.ItemType.COMMON },
  { name: 'Dark Statuette', type: Prisma.ItemType.COMMON },
  { name: 'Gloomy Statuette', type: Prisma.ItemType.COMMON },
  { name: 'Crystalline Cyst Dust', type: Prisma.ItemType.COMMON },
  { name: 'Luminescent Pollen', type: Prisma.ItemType.COMMON },
  { name: 'Fungal Spores', type: Prisma.ItemType.COMMON },
  { name: 'Brilliant Diamond Gemstone', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Brilliant Diamond Chunk', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Brilliant Diamond Fragment', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Brilliant Diamond Sliver', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Agnidus Agate Gemstone', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Agnidus Agate Chunk', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Agnidus Agate Fragment', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Agnidus Agate Sliver', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Varunada Lazurite Gemstone', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Varunada Lazurite Chunk', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Varunada Lazurite Fragment', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Varunada Lazurite Sliver', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Vajrada Amethyst Gemstone', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Vajrada Amethyst Chunk', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Vajrada Amethyst Fragment', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Vajrada Amethyst Sliver', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Vayuda Turquoise Gemstone', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Vayuda Turquoise Chunk', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Vayuda Turquoise Fragment', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Vayuda Turquoise Sliver', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Shivada Jade Gemstone', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Shivada Jade Chunk', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Shivada Jade Fragment', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Shivada Jade Sliver', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Prithiva Topaz Gemstone', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Prithiva Topaz Chunk', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Prithiva Topaz Fragment', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Prithiva Topaz Sliver', type: Prisma.ItemType.ASCENSION_GEM },
  { name: 'Hurricane Seed', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Lightning Prism', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Basalt Pillar', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Hoarfrost Core', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Everflame Seed', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Cleansing Heart', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Juvenile Jade', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Crystalline Bloom', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Marionette Core', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Perpetual Heart', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Smoldering Pearl', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Dew of Repudiation', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Storm Beads', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Riftborn Regalia', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: "Dragonheir's False Fin", type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Runic Fang', type: Prisma.ItemType.ASCENSION_BOSS },
  { name: 'Calla Lily', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Wolfhook', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Valberry', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Cecilia', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Windwheel Aster', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Philanemo Mushroom', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Jueyun Chili', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Noctilucous Jade', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Silk Flower', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Glaze Lily', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Qingxin', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Starconch', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Violetgrass', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Small Lamp Grass', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Dandelion Seed', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Cor Lapis', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Onikabuto', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Sakura Bloom', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Crystal Marrow', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Dendrobium', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Naku Weed', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Sea Ganoderma', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Sango Pearl', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Amakumo Fruit', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Fluorescent Fungus', type: Prisma.ItemType.LOCAL_SPECIALTY },
  { name: 'Philosophies of Freedom', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Guide to Freedom', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Teachings of Freedom', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Philosophies of Prosperity', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Guide to Prosperity', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Teachings of Prosperity', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Philosophies of Transience', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Guide to Transience', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Teachings of Transience', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Philosophies of Elegance', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Guide to Elegance', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Teachings of Elegance', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Philosophies of Resistance', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Guide to Resistance', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Teachings of Resistance', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Philosophies of Diligence', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Guide to Diligence', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Teachings of Diligence', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Philosophies of Ballad', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Guide to Ballad', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Teachings of Ballad', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Philosophies of Gold', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Guide to Gold', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Teachings of Gold', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Philosophies of Light', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Guide to Light', type: Prisma.ItemType.TALENT_BOOK },
  { name: 'Teachings of Light', type: Prisma.ItemType.TALENT_BOOK },
  { name: "Dvalin's Plume", type: Prisma.ItemType.TALENT_BOSS },
  { name: "Dvalin's Claw", type: Prisma.ItemType.TALENT_BOSS },
  { name: "Dvalin's Sigh", type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Tail of Boreas', type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Ring of Boreas', type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Spirit Locket of Boreas', type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Tusk of Monoceros Caeli', type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Shard of a Foul Legacy', type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Shadow of the Warrior', type: Prisma.ItemType.TALENT_BOSS },
  { name: "Dragon Lord's Crown", type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Bloodjade Branch', type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Gilded Scale', type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Molten Moment', type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Ashen Heart', type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Hellfire Butterfly', type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Mudra of the Malefic General', type: Prisma.ItemType.TALENT_BOSS },
  { name: 'Tears of the Calamitous God', type: Prisma.ItemType.TALENT_BOSS },
  { name: 'The Meaning of Aeons', type: Prisma.ItemType.TALENT_BOSS },
]
