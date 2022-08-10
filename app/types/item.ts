import type * as DB from '~/db.server'

export type CharacterCommonGroupName =
  | 'Slime'
  | 'Hilichurl Masks'
  | 'Samachurl Scrolls'
  | 'Hilichurl Arrowheads'
  | 'Fatui Insignia'
  | 'Treasure Hoarder Insignias'
  | 'Whopperflower Nectar'
  | 'Nobushi Handguards'
  | 'Spectral Cores'
  | 'Fungal Spore Powder'

export type CharacterCommonR1 =
  | 'Slime Condensate'
  | 'Damaged Mask'
  | 'Divining Scroll'
  | 'Firm Arrowhead'
  | "Recruit's Insignia"
  | 'Treasure Hoarder Insignia'
  | 'Whopperflower Nectar'
  | 'Old Handguard'
  | 'Spectral Husk'
  | 'Fungal Spores'

export type CharacterCommonR2 =
  | 'Slime Secretions'
  | 'Stained Mask'
  | 'Sealed Scroll'
  | 'Sharp Arrowhead'
  | "Sergeant's Insignia"
  | 'Silver Raven Insignia'
  | 'Shimmering Nectar'
  | 'Kageuchi Handguard'
  | 'Spectral Heart'
  | 'Luminescent Pollen'

export type CharacterCommonR3 =
  | 'Slime Concentrate'
  | 'Ominous Mask'
  | 'Forbidden Curse Scroll'
  | 'Weathered Arrowhead'
  | "Lieutenant's Insignia"
  | 'Golden Raven Insignia'
  | 'Energy Nectar'
  | 'Famed Handguard'
  | 'Spectral Nucleus'
  | 'Crystalline Cyst Dust'

export type WeaponCommonGroupName =
  | 'Hilichurl Horns'
  | 'Ley Line Branches'
  | 'Chaos Parts'
  | 'Mist Grasses'
  | 'Sacrificial Knives'
  | 'Bone Shards'
  | 'Sentinel Chaos Parts'
  | 'Prisms'
  | 'Concealed Riftwolf Claws'
  | 'Statuettes'

export type WeaponCommonR1 =
  | 'Heavy Horn'
  | 'Dead Ley Line Branch'
  | 'Chaos Device'
  | 'Mist Grass Pollen'
  | "Hunter's Sacrificial Knife"
  | 'Fragile Bone Shard'
  | 'Chaos Gear'
  | 'Dismal Prism'
  | 'Concealed Claw'
  | 'Gloomy Statuette'

export type WeaponCommonR2 =
  | 'Black Bronze Horn'
  | 'Dead Ley Line Leaves'
  | 'Chaos Circuit'
  | 'Mist Grass'
  | "Agent's Sacrificial Knife"
  | 'Sturdy Bone Shard'
  | 'Chaos Axis'
  | 'Crystal Prism'
  | 'Concealed Unguis'
  | 'Dark Statuette'

export type WeaponCommonR3 =
  | 'Black Crystal Horn'
  | 'Ley Line Sprout'
  | 'Chaos Core'
  | 'Mist Grass Wick'
  | "Inspector's Sacrificial Knife"
  | 'Fossilized Bone Shard'
  | 'Chaos Oculus'
  | 'Polarizing Prism'
  | 'Concealed Talon'
  | 'Deathly Statuette'

export type AscensionGemType = 'Sliver' | 'Fragment' | 'Chunk' | 'Gemstone'

export type AscensionGemGroupName =
  | 'Prithiva Topaz'
  | 'Shivada Jade'
  | 'Agnidus Agate'
  | 'Varunada Lazurite'
  | 'Vajrada Amethyst'
  | 'Vayuda Turquoise'
  | 'Brilliant Diamond'

export type AscensionGem = `${AscensionGemGroupName} ${AscensionGemType}`

export type AscensionBoss =
  | 'Basalt Pillar'
  | 'Crystalline Bloom'
  | 'Everflame Seed'
  | 'Riftborn Regalia'
  | 'Cleansing Heart'
  | 'Lightning Prism'
  | 'Hoarfrost Core'
  | 'Perpetual Heart'
  | 'Juvenile Jade'
  | 'Hurricane Seed'
  | 'Marionette Core'
  | 'Dew of Repudiation'
  | 'Storm Beads'
  | 'Runic Fang'
  | "Dragonheir's False Fin"
  | 'Smoldering Pearl'

export type LocalSpecialty =
  | 'Cecilia'
  | 'Crystal Marrow'
  | 'Small Lamp Grass'
  | 'Onikabuto'
  | 'Philanemo Mushroom'
  | 'Noctilucous Jade'
  | 'Windwheel Aster'
  | 'Cor Lapis'
  | 'Calla Lily'
  | 'Dandelion Seed'
  | 'Qingxin'
  | 'Sango Pearl'
  | 'Silk Flower'
  | 'Sea Ganoderma'
  | 'Sakura Bloom'
  | 'Dendrobium'
  | 'Naku Weed'
  | 'Valberry'
  | 'Glaze Lily'
  | 'Violetgrass'
  | 'Amakumo Fruit'
  | 'Wolfhook'
  | 'Starconch'
  | 'Fluorescent Fungus'
  | 'Jueyun Chili'

export type TalentBookGroupName =
  | 'Freedom'
  | 'Resistance'
  | 'Ballad'
  | 'Prosperity'
  | 'Diligence'
  | 'Gold'
  | 'Transience'
  | 'Elegance'
  | 'Light'

export type TalentBookTeachings = `Teachings of ${TalentBookGroupName}`

export type TalentBookGuide = `Guide to ${TalentBookGroupName}`

export type TalentBookPhilosophies = `Philosophies of ${TalentBookGroupName}`

export type TalentBoss =
  | 'Tusk of Monoceros Caeli'
  | 'Molten Moment'
  | "Dvalin's Sigh"
  | 'Ashen Heart'
  | 'Ring of Boreas'
  | "Dvalin's Plume"
  | 'Shard of a Foul Legacy'
  | "Dragon Lord's Crown"
  | 'Spirit Locket of Boreas'
  | 'Shadow of the Warrior'
  | 'Gilded Scale'
  | 'Bloodjade Branch'
  | 'Mudra of the Malefic General'
  | 'Tears of the Calamitous God'
  | "Dvalin's Claw"
  | 'Tail of Boreas'
  | 'Hellfire Butterfly'
  | 'The Meaning of Aeons'

export type Special = 'Crown of Insight'

export type Name =
  | CharacterCommonR1
  | CharacterCommonR2
  | CharacterCommonR3
  | WeaponCommonR1
  | WeaponCommonR2
  | WeaponCommonR3
  | AscensionGem
  | AscensionBoss
  | LocalSpecialty
  | TalentBookTeachings
  | TalentBookGuide
  | TalentBookPhilosophies
  | TalentBoss
  | Special

export type TalentBookGroup = [
  TalentBookTeachings,
  TalentBookGuide,
  TalentBookPhilosophies
]

export type CharacterCommonGroup = [
  CharacterCommonR1,
  CharacterCommonR2,
  CharacterCommonR3
]

export type WeaponCommonGroup = [WeaponCommonR1, WeaponCommonR2, WeaponCommonR3]

export type ItemType = DB.ItemType

export type Item = {
  name: Name
  type: ItemType
  rarity: 1 | 2 | 3 | 4 | 5
}
