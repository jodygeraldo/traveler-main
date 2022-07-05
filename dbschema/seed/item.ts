import type { Client } from 'edgedb'
import e from '~/db.server'

const specialItem = [
  { name: 'Crown of Insight', rarity: 5 },
  { name: 'Dream Solvent', rarity: 4 },
  { name: 'Dust of Azoth', rarity: 2 },
]

const commonMaterial = [
  { name: 'Slime Concentrate', rarity: 3, group: 'Slime' },
  { name: 'Slime Secretions', rarity: 2, group: 'Slime' },
  { name: 'Slime Condensate', rarity: 1, group: 'Slime' },
  { name: 'Ominous Mask', rarity: 3, group: 'Hilichurl Masks' },
  { name: 'Stained Mask', rarity: 2, group: 'Hilichurl Masks' },
  { name: 'Damaged Mask', rarity: 1, group: 'Hilichurl Masks' },
  { name: 'Forbidden Curse Scroll', rarity: 3, group: 'Samachurl Scrolls' },
  { name: 'Sealed Scroll', rarity: 2, group: 'Samachurl Scrolls' },
  { name: 'Divining Scroll', rarity: 1, group: 'Samachurl Scrolls' },
  { name: 'Weathered Arrowhead', rarity: 3, group: 'Hilichurl Arrowheads' },
  { name: 'Sharp Arrowhead', rarity: 2, group: 'Hilichurl Arrowheads' },
  { name: 'Firm Arrowhead', rarity: 1, group: 'Hilichurl Arrowheads' },
  { name: 'Black Crystal Horn', rarity: 4, group: 'Hilichurl Horns' },
  { name: 'Black Bronze Horn', rarity: 3, group: 'Hilichurl Horns' },
  { name: 'Heavy Horn', rarity: 2, group: 'Hilichurl Horns' },
  { name: 'Ley Line Sprout', rarity: 4, group: 'Ley Lines' },
  { name: 'Dead Ley Line Leaves', rarity: 3, group: 'Ley Lines' },
  { name: 'Dead Ley Line Branch', rarity: 2, group: 'Ley Lines' },
  { name: 'Chaos Core', rarity: 4, group: 'Chaos Parts' },
  { name: 'Chaos Circuit', rarity: 3, group: 'Chaos Parts' },
  { name: 'Chaos Device', rarity: 2, group: 'Chaos Parts' },
  { name: 'Mist Grass Wick', rarity: 4, group: 'Mist Grass' },
  { name: 'Mist Grass', rarity: 3, group: 'Mist Grass' },
  { name: 'Mist Grass Pollen', rarity: 2, group: 'Mist Grass' },
  {
    name: "Inspector's Sacrificial Knife",
    rarity: 4,
    group: 'Sacrificial Knifes',
  },
  { name: "Agent's Sacrificial Knife", rarity: 3, group: 'Sacrificial Knifes' },
  {
    name: "Hunter's Sacrificial Knife",
    rarity: 2,
    group: 'Sacrificial Knifes',
  },
  { name: "Lieutenant's Insignia", rarity: 3, group: 'Fatui Insignia' },
  { name: "Sergeant's Insignia", rarity: 2, group: 'Fatui Insignia' },
  { name: "Recruit's Insignia", rarity: 1, group: 'Fatui Insignia' },
  {
    name: 'Golden Raven Insignia',
    rarity: 3,
    group: 'Treasure Hoarder Insignias',
  },
  {
    name: 'Silver Raven Insignia',
    rarity: 2,
    group: 'Treasure Hoarder Insignias',
  },
  {
    name: 'Treasure Hoarder Insignia',
    rarity: 1,
    group: 'Treasure Hoarder Insignias',
  },
  { name: 'Energy Nectar', rarity: 3, group: 'Whopperflower Nectar' },
  { name: 'Shimmering Nectar', rarity: 2, group: 'Whopperflower Nectar' },
  { name: 'Whopperflower Nectar', rarity: 1, group: 'Whopperflower Nectar' },
  { name: 'Fossilized Bone Shard', rarity: 4, group: 'Bone Shards' },
  { name: 'Sturdy Bone Shard', rarity: 3, group: 'Bone Shards' },
  { name: 'Fragile Bone Shard', rarity: 2, group: 'Bone Shards' },
  { name: 'Famed Handguard', rarity: 3, group: 'Nobushi Handguards' },
  { name: 'Kageuchi Handguard', rarity: 2, group: 'Nobushi Handguards' },
  { name: 'Old Handguard', rarity: 1, group: 'Nobushi Handguards' },
  { name: 'Chaos Oculus', rarity: 4, group: 'Sentinel Chaos Parts' },
  { name: 'Chaos Axis', rarity: 3, group: 'Sentinel Chaos Parts' },
  { name: 'Chaos Gear', rarity: 2, group: 'Sentinel Chaos Parts' },
  { name: 'Polarizing Prism', rarity: 4, group: 'Prisms' },
  { name: 'Crystal Prism', rarity: 3, group: 'Prisms' },
  { name: 'Dismal Prism', rarity: 2, group: 'Prisms' },
  { name: 'Spectral Nucleus', rarity: 3, group: 'Spectral Cores' },
  { name: 'Spectral Heart', rarity: 2, group: 'Spectral Cores' },
  { name: 'Spectral Husk', rarity: 1, group: 'Spectral Cores' },
  { name: 'Concealed Talon', rarity: 4, group: 'Concealed Rifthound Claws' },
  { name: 'Concealed Unguis', rarity: 3, group: 'Concealed Rifthound Claws' },
  { name: 'Concealed Claw', rarity: 2, group: 'Concealed Rifthound Claws' },
  { name: 'Deathly Statuette', rarity: 4, group: 'Statuettes' },
  { name: 'Dark Statuette', rarity: 3, group: 'Statuettes' },
  { name: 'Gloomy Statuette', rarity: 2, group: 'Statuettes' },
  { name: 'Crystalline Cyst Dust', rarity: 3, group: 'Fungal Spore Powder' },
  { name: 'Luminescent Pollen', rarity: 2, group: 'Fungal Spore Powder' },
  { name: 'Fungal Spores', rarity: 1, group: 'Fungal Spore Powder' },
]

const ascensionGem = [
  { name: 'Brilliant Diamond Gemstone', rarity: 5, group: 'Brilliant Diamond' },
  { name: 'Brilliant Diamond Chunk', rarity: 4, group: 'Brilliant Diamond' },
  { name: 'Brilliant Diamond Fragment', rarity: 3, group: 'Brilliant Diamond' },
  { name: 'Brilliant Diamond Sliver', rarity: 2, group: 'Brilliant Diamond' },
  { name: 'Agnidus Agate Gemstone', rarity: 5, group: 'Agnidus Agate' },
  { name: 'Agnidus Agate Chunk', rarity: 4, group: 'Agnidus Agate' },
  { name: 'Agnidus Agate Fragment', rarity: 3, group: 'Agnidus Agate' },
  { name: 'Agnidus Agate Sliver', rarity: 2, group: 'Agnidus Agate' },
  { name: 'Varunada Lazurite Gemstone', rarity: 5, group: 'Varunada Lazurite' },
  { name: 'Varunada Lazurite Chunk', rarity: 4, group: 'Varunada Lazurite' },
  { name: 'Varunada Lazurite Fragment', rarity: 3, group: 'Varunada Lazurite' },
  { name: 'Varunada Lazurite Sliver', rarity: 2, group: 'Varunada Lazurite' },
  { name: 'Vajrada Amethyst Gemstone', rarity: 5, group: 'Vajrada Amethyst' },
  { name: 'Vajrada Amethyst Chunk', rarity: 4, group: 'Vajrada Amethyst' },
  { name: 'Vajrada Amethyst Fragment', rarity: 3, group: 'Vajrada Amethyst' },
  { name: 'Vajrada Amethyst Sliver', rarity: 2, group: 'Vajrada Amethyst' },
  { name: 'Vayuda Turquoise Gemstone', rarity: 5, group: 'Vayuda Turquoise' },
  { name: 'Vayuda Turquoise Chunk', rarity: 4, group: 'Vayuda Turquoise' },
  { name: 'Vayuda Turquoise Fragment', rarity: 3, group: 'Vayuda Turquoise' },
  { name: 'Vayuda Turquoise Sliver', rarity: 2, group: 'Vayuda Turquoise' },
  { name: 'Shivada Jade Gemstone', rarity: 5, group: 'Shivada Jade' },
  { name: 'Shivada Jade Chunk', rarity: 4, group: 'Shivada Jade' },
  { name: 'Shivada Jade Fragment', rarity: 3, group: 'Shivada Jade' },
  { name: 'Shivada Jade Sliver', rarity: 2, group: 'Shivada Jade' },
  { name: 'Prithiva Topaz Gemstone', rarity: 5, group: 'Prithiva Topaz' },
  { name: 'Prithiva Topaz Chunk', rarity: 4, group: 'Prithiva Topaz' },
  { name: 'Prithiva Topaz Fragment', rarity: 3, group: 'Prithiva Topaz' },
  { name: 'Prithiva Topaz Sliver', rarity: 2, group: 'Prithiva Topaz' },
]

const ascensionBossMaterial = [
  { name: 'Hurricane Seed', rarity: 4 },
  { name: 'Lightning Prism', rarity: 4 },
  { name: 'Basalt Pillar', rarity: 4 },
  { name: 'Hoarfrost Core', rarity: 4 },
  { name: 'Everflame Seed', rarity: 4 },
  { name: 'Cleansing Heart', rarity: 4 },
  { name: 'Juvenile Jade', rarity: 4 },
  { name: 'Crystalline Bloom', rarity: 4 },
  { name: 'Marionette Core', rarity: 4 },
  { name: 'Perpetual Heart', rarity: 4 },
  { name: 'Smoldering Pearl', rarity: 4 },
  { name: 'Dew of Repudiation', rarity: 4 },
  { name: 'Storm Beads', rarity: 4 },
  { name: 'Riftborn Regalia', rarity: 4 },
  { name: "Dragonheir's False Fin", rarity: 4 },
  { name: 'Runic Fang', rarity: 4 },
]

const localSpecialty = [
  { name: 'Calla Lily', rarity: 1 },
  { name: 'Wolfhook', rarity: 1 },
  { name: 'Valberry', rarity: 1 },
  { name: 'Cecilia', rarity: 1 },
  { name: 'Windwheel Aster', rarity: 1 },
  { name: 'Philanemo Mushroom', rarity: 1 },
  { name: 'Jueyun Chili', rarity: 1 },
  { name: 'Noctilucous Jade', rarity: 1 },
  { name: 'Silk Flower', rarity: 1 },
  { name: 'Glaze Lily', rarity: 1 },
  { name: 'Qingxin', rarity: 1 },
  { name: 'Starconch', rarity: 1 },
  { name: 'Violetgrass', rarity: 1 },
  { name: 'Small Lamp Grass', rarity: 1 },
  { name: 'Dandelion Seed', rarity: 1 },
  { name: 'Cor Lapis', rarity: 1 },
  { name: 'Onikabuto', rarity: 1 },
  { name: 'Sakura Bloom', rarity: 1 },
  { name: 'Crystal Marrow', rarity: 1 },
  { name: 'Dendrobium', rarity: 1 },
  { name: 'Naku Weed', rarity: 1 },
  { name: 'Sea Ganoderma', rarity: 1 },
  { name: 'Sango Pearl', rarity: 1 },
  { name: 'Amakumo Fruit', rarity: 1 },
  { name: 'Fluorescent Fungus', rarity: 1 },
]

const talentBook = [
  { name: 'Philosophies of Freedom', rarity: 4, group: 'Freedom' },
  { name: 'Guide to Freedom', rarity: 3, group: 'Freedom' },
  { name: 'Teachings of Freedom', rarity: 2, group: 'Freedom' },
  { name: 'Philosophies of Prosperity', rarity: 4, group: 'Prosperity' },
  { name: 'Guide to Prosperity', rarity: 3, group: 'Prosperity' },
  { name: 'Teachings of Prosperity', rarity: 2, group: 'Prosperity' },
  { name: 'Philosophies of Transience', rarity: 4, group: 'Transience' },
  { name: 'Guide to Transience', rarity: 3, group: 'Transience' },
  { name: 'Teachings of Transience', rarity: 2, group: 'Transience' },
  { name: 'Philosophies of Elegance', rarity: 4, group: 'Elegance' },
  { name: 'Guide to Elegance', rarity: 3, group: 'Elegance' },
  { name: 'Teachings of Elegance', rarity: 2, group: 'Elegance' },
  { name: 'Philosophies of Resistance', rarity: 4, group: 'Resistance' },
  { name: 'Guide to Resistance', rarity: 3, group: 'Resistance' },
  { name: 'Teachings of Resistance', rarity: 2, group: 'Resistance' },
  { name: 'Philosophies of Diligence', rarity: 4, group: 'Diligence' },
  { name: 'Guide to Diligence', rarity: 3, group: 'Diligence' },
  { name: 'Teachings of Diligence', rarity: 2, group: 'Diligence' },
  { name: 'Philosophies of Ballad', rarity: 4, group: 'Ballad' },
  { name: 'Guide to Ballad', rarity: 3, group: 'Ballad' },
  { name: 'Teachings of Ballad', rarity: 2, group: 'Ballad' },
  { name: 'Philosophies of Gold', rarity: 4, group: 'Gold' },
  { name: 'Guide to Gold', rarity: 3, group: 'Gold' },
  { name: 'Teachings of Gold', rarity: 2, group: 'Gold' },
  { name: 'Philosophies of Light', rarity: 4, group: 'Light' },
  { name: 'Guide to Light', rarity: 3, group: 'Light' },
  { name: 'Teachings of Light', rarity: 2, group: 'Light' },
]

const talentBossMaterial = [
  { name: "Dvalin's Plume", rarity: 5, group: 'Confront Stormterror' },
  { name: "Dvalin's Claw", rarity: 5, group: 'Confront Stormterror' },
  { name: "Dvalin's Sigh", rarity: 5, group: 'Confront Stormterror' },
  { name: 'Tail of Boreas', rarity: 5, group: 'Wolf of the North' },
  { name: 'Ring of Boreas', rarity: 5, group: 'Wolf of the North' },
  { name: 'Spirit Locket of Boreas', rarity: 5, group: 'Wolf of the North' },
  {
    name: 'Tusk of Monoceros Caeli',
    rarity: 5,
    group: 'Enter the Golden House',
  },
  {
    name: 'Shard of a Foul Legacy',
    rarity: 5,
    group: 'Enter the Golden House',
  },
  { name: 'Shadow of the Warrior', rarity: 5, group: 'Enter the Golden House' },
  {
    name: "Dragon Lord's Crown",
    rarity: 5,
    group: 'Beneath the Dragon-Queller',
  },
  { name: 'Bloodjade Branch', rarity: 5, group: 'Beneath the Dragon-Queller' },
  { name: 'Gilded Scale', rarity: 5, group: 'Beneath the Dragon-Queller' },
  { name: 'Molten Moment', rarity: 5, group: 'Narukami Island: Tenshukaku' },
  { name: 'Ashen Heart', rarity: 5, group: 'Narukami Island: Tenshukaku' },
  {
    name: 'Hellfire Butterfly',
    rarity: 5,
    group: 'Narukami Island: Tenshukaku',
  },
  {
    name: 'Mudra of the Malefic General',
    rarity: 5,
    group: 'End of the Oneiric Euthymia',
  },
  {
    name: 'Tears of the Calamitous God',
    rarity: 5,
    group: 'End of the Oneiric Euthymia',
  },
  {
    name: 'The Meaning of Aeons',
    rarity: 5,
    group: 'End of the Oneiric Euthymia',
  },
]

const querySpecial = e.params({ items: e.json }, (params) => {
  return e.for(e.json_array_unpack(params.items), (i) => {
    return e
      .insert(e.SpecialItem, {
        name: e.cast(e.str, i.name),
        rarity: e.cast(e.int16, i.rarity),
      })
      .unlessConflict()
  })
})

const queryCommon = e.params({ items: e.json }, (params) => {
  return e.for(e.json_array_unpack(params.items), (i) => {
    return e
      .insert(e.CommonMaterial, {
        name: e.cast(e.str, i.name),
        rarity: e.cast(e.int16, i.rarity),
        base: e.cast(e.str, i.group),
      })
      .unlessConflict()
  })
})

const queryAscensionGem = e.params({ items: e.json }, (params) => {
  return e.for(e.json_array_unpack(params.items), (i) => {
    return e
      .insert(e.AscensionGem, {
        name: e.cast(e.str, i.name),
        rarity: e.cast(e.int16, i.rarity),
        base: e.cast(e.str, i.group),
      })
      .unlessConflict()
  })
})

const queryAscensionBoss = e.params({ items: e.json }, (params) => {
  return e.for(e.json_array_unpack(params.items), (i) => {
    return e
      .insert(e.AscensionBossMaterial, {
        name: e.cast(e.str, i.name),
        rarity: e.cast(e.int16, i.rarity),
      })
      .unlessConflict()
  })
})

const queryLocalSpecialty = e.params({ items: e.json }, (params) => {
  return e.for(e.json_array_unpack(params.items), (i) => {
    return e
      .insert(e.LocalSpecialty, {
        name: e.cast(e.str, i.name),
        rarity: e.cast(e.int16, i.rarity),
      })
      .unlessConflict()
  })
})

const queryTalentBook = e.params({ items: e.json }, (params) => {
  return e.for(e.json_array_unpack(params.items), (i) => {
    return e
      .insert(e.TalentBook, {
        name: e.cast(e.str, i.name),
        rarity: e.cast(e.int16, i.rarity),
        base: e.cast(e.str, i.group),
      })
      .unlessConflict()
  })
})

const queryTalentBoss = e.params({ items: e.json }, (params) => {
  return e.for(e.json_array_unpack(params.items), (i) => {
    return e
      .insert(e.TalentBossMaterial, {
        name: e.cast(e.str, i.name),
        rarity: e.cast(e.int16, i.rarity),
        base: e.cast(e.str, i.group),
      })
      .unlessConflict()
  })
})

function seedSpecial(client: Client) {
  return querySpecial.run(client, {
    items: JSON.stringify(specialItem),
  })
}

function seedCommon(client: Client) {
  return queryCommon.run(client, {
    items: JSON.stringify(commonMaterial),
  })
}

function seedAscensionGem(client: Client) {
  return queryAscensionGem.run(client, {
    items: JSON.stringify(ascensionGem),
  })
}

function seedAscensionBoss(client: Client) {
  return queryAscensionBoss.run(client, {
    items: JSON.stringify(ascensionBossMaterial),
  })
}

function seedLocalSpecialty(client: Client) {
  return queryLocalSpecialty.run(client, {
    items: JSON.stringify(localSpecialty),
  })
}

function seedTalentBook(client: Client) {
  return queryTalentBook.run(client, {
    items: JSON.stringify(talentBook),
  })
}

function seedTalentBoss(client: Client) {
  return queryTalentBoss.run(client, {
    items: JSON.stringify(talentBossMaterial),
  })
}

export function seedItems(client: Client) {
  return [
    seedSpecial(client),
    seedCommon(client),
    seedAscensionGem(client),
    seedAscensionBoss(client),
    seedLocalSpecialty(client),
    seedTalentBook(client),
    seedTalentBoss(client),
  ]
}
