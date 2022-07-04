import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import type * as CharacterModel from '~/models/character.server'

export interface CharacterData {
	name: string
	level: number
	ascension: number
	normalAttack: number
	elementalSkill: number
	elementalBurst: number
}

type CommonMaterial =
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

const commonMaterials: Record<CommonMaterial, string[]> = {
	Slime: ['Slime Condensate', 'Slime Secretions', 'Slime Concentrate'],
	'Hilichurl Masks': ['Damaged Mask', 'Stained Mask', 'Ominous Mask'],
	'Samachurl Scrolls': [
		'Divining Scroll',
		'Sealed Scroll',
		'Forbidden Curse Scroll',
	],
	'Hilichurl Arrowheads': [
		'Firm Arrowhead',
		'Sharp Arrowhead',
		'Weathered Arrowhead',
	],
	'Fatui Insignia': [
		"Recruit's Insignia",
		"Sergeant's Insignia",
		"Lieutenant's Insignia",
	],
	'Treasure Hoarder Insignias': [
		'Treasure Hoarder Insignia',
		'Silver Raven Insignia',
		'Golden Raven Insignia',
	],
	'Whopperflower Nectar': [
		'Whopperflower Nectar',
		'Shimmering Nectar',
		'Energy Nectar',
	],
	'Nobushi Handguards': [
		'Old Handguard',
		'Kageuchi Handguard',
		'Famed Handguard',
	],
	'Spectral Cores': ['Spectral Husk', 'Spectral Heart', 'Spectral Nucleus'],
	'Fungal Spore Powder': [
		'Fungal Spores',
		'Luminescent Pollen',
		'Crystalline Cyst Dust',
	],
}

const characters: Character[] = [
	{
		name: 'Albedo',
		weapon: 'Sword',
		vision: 'Geo',
		rarity: 5,
		talent: [
			'Normal Attack: Favonius Bladework - Weiss',
			'Abiogenesis: Solar Isotoma',
			'Rite of Progeniture: Tectonic Tide',
		],
	},
	{
		name: 'Aloy',
		weapon: 'Bow',
		vision: 'Cryo',
		rarity: 5,
		talent: ['Normal Attack: Rapid Fire', 'Frozen Wilds', 'Prophecies of Dawn'],
	},
	{
		name: 'Amber',
		weapon: 'Bow',
		vision: 'Pyro',
		rarity: 4,
		talent: ['Normal Attack: Sharpshooter', 'Explosive Puppet', 'Fiery Rain'],
	},
	{
		name: 'Arataki Itto',
		weapon: 'Claymore',
		vision: 'Geo',
		rarity: 5,
		talent: [
			'Normal Attack: Fight Club Legend',
			'Masatsu Zetsugi: Akaushi Burst!',
			'Royal Descent: Behold, Itto the Evil!',
		],
	},
	{
		name: 'Barbara',
		weapon: 'Catalyst',
		vision: 'Hydro',
		rarity: 4,
		talent: [
			'Normal Attack: Whisper of Water',
			'Let the Show Begin♪',
			'Shining Miracle♪',
		],
	},
	{
		name: 'Beidou',
		weapon: 'Claymore',
		vision: 'Electro',
		rarity: 4,
		talent: ['Normal Attack: Oceanborne', 'Tidecaller', 'Stormbreaker'],
	},
	{
		name: 'Bennett',
		weapon: 'Sword',
		vision: 'Pyro',
		rarity: 4,
		talent: [
			'Normal Attack: Strike of Fortune',
			'Passion Overload',
			'Fantastic Voyage',
		],
	},
	{
		name: 'Chongyun',
		weapon: 'Claymore',
		vision: 'Cryo',
		rarity: 4,
		talent: [
			'Normal Attack: Demonbane',
			"Spirit Blade: Chonghua's Layered Frost",
			'Spirit Blade: Cloud-Parting Star',
		],
	},
	{
		name: 'Diluc',
		weapon: 'Claymore',
		vision: 'Pyro',
		rarity: 5,
		talent: ['Normal Attack: Tempered Sword', 'Searing Onslaught', 'Dawn'],
	},
	{
		name: 'Diona',
		weapon: 'Bow',
		vision: 'Cryo',
		rarity: 4,
		talent: ['Normal Attack: Kätzlein Style', 'Icy Paws', 'Signature Mix'],
	},
	{
		name: 'Eula',
		weapon: 'Claymore',
		vision: 'Cryo',
		rarity: 5,
		talent: [
			'Normal Attack: Favonius Bladework - Edel',
			'Icetide Vortex',
			'Glacial Illumination',
		],
	},
	{
		name: 'Fischl',
		weapon: 'Bow',
		vision: 'Electro',
		rarity: 4,
		talent: [
			'Normal Attack: Bolts of Downfall',
			'Nightrider',
			'Midnight Phantasmagoria',
		],
	},
	{
		name: 'Ganyu',
		weapon: 'Bow',
		vision: 'Cryo',
		rarity: 5,
		talent: [
			'Normal Attack: Liutian Archery',
			'Trail of the Qilin',
			'Celestial Shower',
		],
	},
	{
		name: 'Gorou',
		weapon: 'Bow',
		vision: 'Geo',
		rarity: 4,
		talent: [
			'Normal Attack: Ripping Fang Fletching',
			'Inuzaka All-Round Defense',
			'Juuga: Forward Unto Victory',
		],
	},
	{
		name: 'Hu Tao',
		weapon: 'Polearm',
		vision: 'Pyro',
		rarity: 5,
		talent: [
			'Normal Attack: Secret Spear of Wangsheng',
			'Guide to Afterlife',
			'Spirit Soother',
		],
	},
	{
		name: 'Jean',
		weapon: 'Sword',
		vision: 'Anemo',
		rarity: 5,
		talent: [
			'Normal Attack: Favonius Bladework',
			'Gale Blade',
			'Dandelion Breeze',
		],
	},
	{
		name: 'Kaedehara Kazuha',
		weapon: 'Sword',
		vision: 'Anemo',
		rarity: 5,
		talent: ['Normal Attack: Garyuu Bladework', 'Chihayaburu', 'Kazuha Slash'],
	},
	{
		name: 'Kaeya',
		weapon: 'Sword',
		vision: 'Cryo',
		rarity: 4,
		talent: [
			'Normal Attack: Ceremonial Bladework',
			'Frostgnaw',
			'Glacial Waltz',
		],
	},
	{
		name: 'Kamisato Ayaka',
		weapon: 'Sword',
		vision: 'Cryo',
		rarity: 5,
		talent: [
			'Normal Attack: Kamisato Art - Kabuki',
			'Kamisato Art: Hyouka',
			'Kamisato Art: Soumetsu',
		],
	},
	{
		name: 'Kamisato Ayato',
		weapon: 'Sword',
		vision: 'Hydro',
		rarity: 5,
		talent: [
			'Normal Attack: Kamisato Art - Marobashi',
			'Kamisato Art: Kyouka',
			'Kamisato Art: Suiyuu',
		],
	},
	{
		name: 'Keqing',
		weapon: 'Sword',
		vision: 'Electro',
		rarity: 5,
		talent: [
			'Normal Attack: Yunlai Swordsmanship',
			'Stellar Restoration',
			'Starward Sword',
		],
	},
	{
		name: 'Klee',
		weapon: 'Catalyst',
		vision: 'Pyro',
		rarity: 5,
		talent: ['Normal Attack: Kaboom!', 'Jumpy Dumpty', "Sparks 'n' Splash"],
	},
	{
		name: 'Kujou Sara',
		weapon: 'Bow',
		vision: 'Electro',
		rarity: 4,
		talent: [
			'Normal Attack: Tengu Bowmanship',
			'Tengu Stormcall',
			'Subjugation: Koukou Sendou',
		],
	},
	{
		name: 'Kuki Shinobu',
		weapon: 'Sword',
		vision: 'Electro',
		rarity: 4,
		talent: [
			"Normal Attack: Shinobu's Shadowsword",
			'Sanctifying Ring',
			'Gyoei Narukami Kariyama Rite',
		],
	},
	{
		name: 'Lisa',
		weapon: 'Catalyst',
		vision: 'Electro',
		rarity: 4,
		talent: ['Normal Attack: Lightning Touch', 'Violet Arc', 'Lightning Rose'],
	},
	{
		name: 'Mona',
		weapon: 'Catalyst',
		vision: 'Hydro',
		rarity: 5,
		talent: [
			'Normal Attack: Ripple of Fate',
			'Mirror Reflection of Doom',
			'Stellaris Phantasm',
		],
	},
	{
		name: 'Ningguang',
		weapon: 'Catalyst',
		vision: 'Geo',
		rarity: 4,
		talent: ['Normal Attack: Sparkling Scatter', 'Jade Screen', 'Starshatter'],
	},
	{
		name: 'Noelle',
		weapon: 'Claymore',
		vision: 'Geo',
		rarity: 4,
		talent: [
			'Normal Attack: Favonius Bladework - Maid',
			'Breastplate',
			'Sweeping Time',
		],
	},
	{
		name: 'Qiqi',
		weapon: 'Sword',
		vision: 'Cryo',
		rarity: 5,
		talent: [
			'Normal Attack: Ancient Sword Art',
			'Adeptus Art: Herald of Frost',
			'Adeptus Art: Preserver of Fortune',
		],
	},
	{
		name: 'Raiden Shogun',
		weapon: 'Polearm',
		vision: 'Electro',
		rarity: 5,
		talent: [
			'Normal Attack: Origin',
			'Transcendence: Baleful Omen',
			'Secret Art: Musou Shinsetsu',
		],
	},
	{
		name: 'Razor',
		weapon: 'Claymore',
		vision: 'Electro',
		rarity: 4,
		talent: ['Normal Attack: Steel Fang', 'Claw and Thunder', 'Lightning Fang'],
	},
	{
		name: 'Rosaria',
		weapon: 'Polearm',
		vision: 'Cryo',
		rarity: 4,
		talent: [
			'Normal Attack: Spear of the Church',
			'Ravaging Confession',
			'Rites of Termination',
		],
	},
	{
		name: 'Sangonomiya Kokomi',
		weapon: 'Catalyst',
		vision: 'Hydro',
		rarity: 5,
		talent: [
			'Normal Attack: The Shape of Water',
			"Kurage's Oath",
			"Nereid's Ascension",
		],
	},
	{
		name: 'Sayu',
		weapon: 'Claymore',
		vision: 'Anemo',
		rarity: 4,
		talent: [
			'Normal Attack: Shuumatsuban Ninja Blade',
			'Yoohoo Art: Fuuin Dash',
			'Yoohoo Art: Mujina Flurry',
		],
	},
	{
		name: 'Shenhe',
		weapon: 'Polearm',
		vision: 'Cryo',
		rarity: 5,
		talent: [
			'Normal Attack: Dawnstar Piercer',
			'Spring Spirit Summoning',
			"Divine Maiden's Deliverance",
		],
	},
	{
		name: 'Sucrose',
		weapon: 'Catalyst',
		vision: 'Anemo',
		rarity: 4,
		talent: [
			'Normal Attack: Wind Spirit Creation',
			'Astable Anemohypostasis Creation - 6308',
			'Forbidden Creation - Isomer 75 / Type II',
		],
	},
	{
		name: 'Tartaglia',
		weapon: 'Bow',
		vision: 'Hydro',
		rarity: 5,
		talent: [
			'Normal Attack: Cutting Torrent',
			'Foul Legacy: Raging Tide',
			'Havoc: Obliteration',
		],
	},
	{
		name: 'Thoma',
		weapon: 'Polearm',
		vision: 'Pyro',
		rarity: 4,
		talent: [
			'Normal Attack: Swiftshatter Spear',
			'Blazing Blessing',
			'Crimson Ooyoroi',
		],
	},
	{
		name: 'Traveler',
		weapon: 'Sword',
		vision: ['Anemo', 'Geo', 'Electro'],
		rarity: 5,
		talent: {
			Anemo: {
				normalAttack: 'Normal Attack: Foreign Thundershock',
				elementalSkill: 'Palm Vortex',
				elementalBurst: 'Gust Surge',
			},
			Geo: {
				normalAttack: 'Normal Attack: Foreign Thundershock',
				elementalSkill: 'Starfell Sword',
				elementalBurst: 'Wake of Earth',
			},
			Electro: {
				normalAttack: 'Normal Attack: Foreign Thundershock',
				elementalSkill: 'Lightning Blade',
				elementalBurst: 'Bellowing Thunder',
			},
		},
	},
	{
		name: 'Venti',
		weapon: 'Bow',
		vision: 'Anemo',
		rarity: 5,
		talent: [
			'Normal Attack: Divine Marksmanship',
			'Skyward Sonnet',
			"Wind's Grand Ode",
		],
	},
	{
		name: 'Xiangling',
		weapon: 'Polearm',
		vision: 'Pyro',
		rarity: 4,
		talent: ['Normal Attack: Dough-Fu', 'Guoba Attack', 'Pyronado'],
	},
	{
		name: 'Xiao',
		weapon: 'Polearm',
		vision: 'Anemo',
		rarity: 5,
		talent: [
			'Normal Attack: Whirlwind Thrust',
			'Lemniscatic Wind Cycling',
			'Bane of All Evil',
		],
	},
	{
		name: 'Xingqiu',
		weapon: 'Sword',
		vision: 'Hydro',
		rarity: 4,
		talent: [
			'Normal Attack: Guhua Style',
			'Guhua Sword: Fatal Rainscreen',
			'Guhua Sword: Raincutter',
		],
	},
	{
		name: 'Xinyan',
		weapon: 'Claymore',
		vision: 'Pyro',
		rarity: 4,
		talent: [
			'Normal Attack: Dance on Fire',
			'Sweeping Fervor',
			'Riff Revolution',
		],
	},
	{
		name: 'Yae Miko',
		weapon: 'Catalyst',
		vision: 'Electro',
		rarity: 5,
		talent: [
			'Normal Attack: Spiritfox Sin-Eater',
			'Yakan Evocation: Sesshou Sakura',
			'Great Secret Art: Tenko Kenshin',
		],
	},
	{
		name: 'Yanfei',
		weapon: 'Catalyst',
		vision: 'Pyro',
		rarity: 4,
		talent: ['Normal Attack: Seal of Approval', 'Signed Edict', 'Done Deal'],
	},
	{
		name: 'Yelan',
		weapon: 'Bow',
		vision: 'Hydro',
		rarity: 5,
		talent: [
			'Normal Attack: Stealthy Bowshot',
			'Lingering Lifeline',
			'Depth-Clarion Dice',
		],
	},
	{
		name: 'Yoimiya',
		weapon: 'Bow',
		vision: 'Pyro',
		rarity: 5,
		talent: [
			'Normal Attack: Firework Flare-Up',
			'Niwabi Fire-Dance',
			'Ryuukin Saxifrage',
		],
	},
	{
		name: 'Yun Jin',
		weapon: 'Polearm',
		vision: 'Geo',
		rarity: 4,
		talent: [
			'Normal Attack: Cloud-Grazing Strike',
			'Opening Flourish',
			"Cliffbreaker's Banner",
		],
	},
	{
		name: 'Zhongli',
		weapon: 'Polearm',
		vision: 'Geo',
		rarity: 5,
		talent: [
			'Normal Attack: Rain of Stone',
			'Dominus Lapidis',
			'Planet Befall',
		],
	},
]

export interface Character {
	name: string
	weapon: 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst'
	vision: string | string[]
	rarity: 4 | 5
	talent:
		| [string, string, string]
		| {
				[key: string]: {
					normalAttack: string
					elementalSkill: string
					elementalBurst: string
				}
		  }

	progression?: {
		level?: number | null
		ascension?: number | null
		normalAttack?: number | null
		elementalSkill?: number | null
		elementalBurst?: number | null
	}
}

export interface CharacterMinimal
	extends Omit<Character, 'vision' | 'rarity'> {}

export function getCharacters({
	userCharacters,
	travelers,
}: {
	userCharacters: CharacterModel.CharactersInfer
	travelers: CharacterModel.CharactersInfer
}): { characters: Character[]; travelers: Character[] } {
	invariant(
		userCharacters,
		'there is no characters associated with this account'
	)
	invariant(travelers, 'there is no travelers associated with this account')

	const updatedCharacters = [...characters]

	userCharacters.forEach((character) => {
		const idx = updatedCharacters.findIndex((c) => c.name === character.name)

		if (idx === -1) {
			return
		}

		updatedCharacters[idx].progression = {
			level: character['@level'],
			ascension: character['@ascension'],
			normalAttack: character['@normal_attack'],
			elementalSkill: character['@elemental_skill'],
			elementalBurst: character['@elemental_burst'],
		}
	})

	const travelerVision = ['Anemo', 'Geo', 'Electro']

	const travelerData = characters.find((c) => c.name === 'Traveler')
	invariant(travelerData, 'Traveler is missing from the character list')

	const updatedTravelers: Character[] = []

	travelerVision.forEach((vision) => {
		const traveler = travelers.find((t) => t.name.includes(vision))
		let talent: [string, string, string] = ['', '', '']

		if (!Array.isArray(travelerData.talent)) {
			talent[0] = travelerData.talent[vision].normalAttack
			talent[1] = travelerData.talent[vision].elementalSkill
			talent[2] = travelerData.talent[vision].elementalBurst
		}

		updatedTravelers.push({
			name: `Traveler ${vision}`,
			weapon: 'Sword',
			vision,
			rarity: 5,
			talent,
			progression: {
				level: traveler?.['@level'] ?? 1,
				ascension: traveler?.['@ascension'] ?? 0,
				normalAttack: traveler?.['@normal_attack'] ?? 1,
				elementalSkill: traveler?.['@elemental_skill'] ?? 1,
				elementalBurst: traveler?.['@elemental_burst'] ?? 1,
			},
		})
	})

	return { characters: updatedCharacters, travelers: updatedTravelers }
}

export function validateCharacter(name: string) {
	return characters.findIndex((c) => c.name === name) !== -1
}

export function getCharacter({
	name,
	characterData,
}: {
	name: string
	characterData: CharacterModel.CharacterInfer
}): CharacterMinimal | null {
	const character = characters.find((character) => character.name === name)
	if (!character) {
		return null
	}

	const { weapon, talent } = character
	const updatedCharacter = characterData
		? {
				name,
				weapon,
				talent,
				progression: {
					level: characterData['@level'],
					ascension: characterData['@ascension'],
					normalAttack: characterData['@normal_attack'],
					elementalSkill: characterData['@elemental_skill'],
					elementalBurst: characterData['@elemental_burst'],
				},
		  }
		: { name, weapon, talent }
	return updatedCharacter
}

interface CharacterMaterial {
	name: string
	ascension: {
		gem: string
		boss: string
		local: string
		common: string[]
	}
	talent: {
		book: string[]
		boss: string
		common: string[]
		special: string
	}
}

const characterMaterial: CharacterMaterial[] = [
	{
		name: 'Albedo',
		ascension: {
			gem: 'Prithiva Topaz',
			boss: 'Basalt Pillar',
			local: 'Cecilia',
			common: commonMaterials['Samachurl Scrolls'],
		},
		talent: {
			book: [
				'Teachings of Freedom',
				'Guide to Freedom',
				'Philosophies of Freedom',
			],
			boss: 'Tusk of Monoceros Caeli',
			common: commonMaterials['Samachurl Scrolls'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Aloy',
		ascension: {
			gem: 'Shivada Jade',
			boss: 'Crystalline Bloom',
			local: 'Crystal Marrow',
			common: commonMaterials['Spectral Cores'],
		},
		talent: {
			book: [
				'Teachings of Freedom',
				'Guide to Freedom',
				'Philosophies of Freedom',
			],
			boss: 'Molten Moment',
			common: commonMaterials['Spectral Cores'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Amber',
		ascension: {
			gem: 'Agnidus Agate',
			boss: 'Everflame Seed',
			local: 'Small Lamp Grass',
			common: commonMaterials['Hilichurl Arrowheads'],
		},
		talent: {
			book: [
				'Teachings of Freedom',
				'Guide to Freedom',
				'Philosophies of Freedom',
			],
			boss: "Dvalin's Sigh",
			common: commonMaterials['Hilichurl Arrowheads'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Arataki Itto',
		ascension: {
			gem: 'Prithiva Topaz',
			boss: 'Riftborn Regalia',
			local: 'Onikabuto',
			common: commonMaterials['Slime'],
		},
		talent: {
			book: [
				'Teachings of Elegance',
				'Guide to Elegance',
				'Philosophies of Elegance',
			],
			boss: 'Ashen Heart',
			common: commonMaterials['Slime'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Barbara',
		ascension: {
			gem: 'Varunada Lazurite',
			boss: 'Cleansing Heart',
			local: 'Philanemo Mushroom',
			common: commonMaterials['Samachurl Scrolls'],
		},
		talent: {
			book: [
				'Teachings of Freedom',
				'Guide to Freedom',
				'Philosophies of Freedom',
			],
			boss: 'Ring of Boreas',
			common: commonMaterials['Samachurl Scrolls'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Beidou',
		ascension: {
			gem: 'Vajrada Amethyst',
			boss: 'Lightning Prism',
			local: 'Noctilucous Jade',
			common: commonMaterials['Treasure Hoarder Insignias'],
		},
		talent: {
			book: ['Teachings of Gold', 'Guide to Gold', 'Philosophies of Gold'],
			boss: "Dvalin's Sigh",
			common: commonMaterials['Treasure Hoarder Insignias'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Bennett',
		ascension: {
			gem: 'Agnidus Agate',
			boss: 'Everflame Seed',
			local: 'Windwheel Aster',
			common: commonMaterials['Treasure Hoarder Insignias'],
		},
		talent: {
			book: [
				'Teachings of Resistance',
				'Guide to Resistance',
				'Philosophies of Resistance',
			],
			boss: "Dvalin's Plume",
			common: commonMaterials['Treasure Hoarder Insignias'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Chongyun',
		ascension: {
			gem: 'Shivada Jade',
			boss: 'Hoarfrost Core',
			local: 'Cor Lapis',
			common: commonMaterials['Hilichurl Masks'],
		},
		talent: {
			book: [
				'Teachings of Diligence',
				'Guide to Diligence',
				'Philosophies of Diligence',
			],
			boss: "Dvalin's Sigh",
			common: commonMaterials['Hilichurl Masks'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Diluc',
		ascension: {
			gem: 'Agnidus Agate',
			boss: 'Everflame Seed',
			local: 'Small Lamp Grass',
			common: commonMaterials['Fatui Insignia'],
		},
		talent: {
			book: [
				'Teachings of Resistance',
				'Guide to Resistance',
				'Philosophies of Resistance',
			],
			boss: "Dvalin's Plume",
			common: commonMaterials['Fatui Insignia'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Diona',
		ascension: {
			gem: 'Shivada Jade',
			boss: 'Hoarfrost Core',
			local: 'Calla Lily',
			common: commonMaterials['Hilichurl Arrowheads'],
		},
		talent: {
			book: [
				'Teachings of Freedom',
				'Guide to Freedom',
				'Philosophies of Freedom',
			],
			boss: 'Shard of a Foul Legacy',
			common: commonMaterials['Hilichurl Arrowheads'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Eula',
		ascension: {
			gem: 'Shivada Jade',
			boss: 'Crystalline Bloom',
			local: 'Dandelion Seed',
			common: commonMaterials['Hilichurl Masks'],
		},
		talent: {
			book: [
				'Teachings of Resistance',
				'Guide to Resistance',
				'Philosophies of Resistance',
			],
			boss: "Dragon Lord's Crown",
			common: commonMaterials['Hilichurl Masks'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Fischl',
		ascension: {
			gem: 'Vajrada Amethyst',
			boss: 'Lightning Prism',
			local: 'Small Lamp Grass',
			common: commonMaterials['Hilichurl Arrowheads'],
		},
		talent: {
			book: [
				'Teachings of Ballad',
				'Guide to Ballad',
				'Philosophies of Ballad',
			],
			boss: 'Spirit Locket of Boreas',
			common: commonMaterials['Hilichurl Arrowheads'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Ganyu',
		ascension: {
			gem: 'Shivada Jade',
			boss: 'Hoarfrost Core',
			local: 'Qingxin',
			common: commonMaterials['Whopperflower Nectar'],
		},
		talent: {
			book: [
				'Teachings of Diligence',
				'Guide to Diligence',
				'Philosophies of Diligence',
			],
			boss: 'Shadow of the Warrior',
			common: commonMaterials['Whopperflower Nectar'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Gorou',
		ascension: {
			gem: 'Prithiva Topaz',
			boss: 'Perpetual Heart',
			local: 'Sango Pearl',
			common: commonMaterials['Spectral Cores'],
		},
		talent: {
			book: ['Teachings of Light', 'Guide to Light', 'Philosophies of Light'],
			boss: 'Molten Moment',
			common: commonMaterials['Spectral Cores'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Hu Tao',
		ascension: {
			gem: 'Agnidus Agate',
			boss: 'Juvenile Jade',
			local: 'Silk Flower',
			common: commonMaterials['Whopperflower Nectar'],
		},
		talent: {
			book: [
				'Teachings of Diligence',
				'Guide to Diligence',
				'Philosophies of Diligence',
			],
			boss: 'Shard of a Foul Legacy',
			common: commonMaterials['Whopperflower Nectar'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Jean',
		ascension: {
			gem: 'Vayuda Turquoise',
			boss: 'Hurricane Seed',
			local: 'Dandelion Seed',
			common: commonMaterials['Hilichurl Masks'],
		},
		talent: {
			book: [
				'Teachings of Resistance',
				'Guide to Resistance',
				'Philosophies of Resistance',
			],
			boss: "Dvalin's Plume",
			common: commonMaterials['Hilichurl Masks'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Kaedehara Kazuha',
		ascension: {
			gem: 'Vayuda Turquoise',
			boss: 'Marionette Core',
			local: 'Sea Ganoderma',
			common: commonMaterials['Treasure Hoarder Insignias'],
		},
		talent: {
			book: [
				'Teachings of Diligence',
				'Guide to Diligence',
				'Philosophies of Diligence',
			],
			boss: 'Gilded Scale',
			common: commonMaterials['Treasure Hoarder Insignias'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Kaeya',
		ascension: {
			gem: 'Shivada Jade',
			boss: 'Hoarfrost Core',
			local: 'Calla Lily',
			common: commonMaterials['Treasure Hoarder Insignias'],
		},
		talent: {
			book: [
				'Teachings of Ballad',
				'Guide to Ballad',
				'Philosophies of Ballad',
			],
			boss: 'Spirit Locket of Boreas',
			common: commonMaterials['Treasure Hoarder Insignias'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Kamisato Ayaka',
		ascension: {
			gem: 'Shivada Jade',
			boss: 'Perpetual Heart',
			local: 'Sakura Bloom',
			common: commonMaterials['Nobushi Handguards'],
		},
		talent: {
			book: [
				'Teachings of Elegance',
				'Guide to Elegance',
				'Philosophies of Elegance',
			],
			boss: 'Bloodjade Branch',
			common: commonMaterials['Nobushi Handguards'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Kamisato Ayato',
		ascension: {
			gem: 'Varunada Lazurite',
			boss: 'Dew of Repudiation',
			local: 'Sakura Bloom',
			common: commonMaterials['Nobushi Handguards'],
		},
		talent: {
			book: [
				'Teachings of Elegance',
				'Guide to Elegance',
				'Philosophies of Elegance',
			],
			boss: 'Mudra of the Malefic General',
			common: commonMaterials['Nobushi Handguards'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Keqing',
		ascension: {
			gem: 'Vajrada Amethyst',
			boss: 'Lightning Prism',
			local: 'Cor Lapis',
			common: commonMaterials['Whopperflower Nectar'],
		},
		talent: {
			book: [
				'Teachings of Prosperity',
				'Guide to Prosperity',
				'Philosophies of Prosperity',
			],
			boss: 'Ring of Boreas',
			common: commonMaterials['Whopperflower Nectar'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Klee',
		ascension: {
			gem: 'Agnidus Agate',
			boss: 'Everflame Seed',
			local: 'Philanemo Mushroom',
			common: commonMaterials['Samachurl Scrolls'],
		},
		talent: {
			book: [
				'Teachings of Freedom',
				'Guide to Freedom',
				'Philosophies of Freedom',
			],
			boss: 'Ring of Boreas',
			common: commonMaterials['Samachurl Scrolls'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Kujou Sara',
		ascension: {
			gem: 'Vajrada Amethyst',
			boss: 'Storm Beads',
			local: 'Dendrobium',
			common: commonMaterials['Hilichurl Masks'],
		},
		talent: {
			book: [
				'Teachings of Elegance',
				'Guide to Elegance',
				'Philosophies of Elegance',
			],
			boss: 'Ashen Heart',
			common: commonMaterials['Hilichurl Masks'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Kuki Shinobu',
		ascension: {
			gem: 'Vajrada Amethyst',
			boss: 'Runic Fang',
			local: 'Naku Weed',
			common: commonMaterials['Spectral Cores'],
		},
		talent: {
			book: [
				'Teachings of Elegance',
				'Guide to Elegance',
				'Philosophies of Elegance',
			],
			boss: 'Tears of the Calamitous God',
			common: commonMaterials['Spectral Cores'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Lisa',
		ascension: {
			gem: 'Vajrada Amethyst',
			boss: 'Lightning Prism',
			local: 'Valberry',
			common: commonMaterials['Slime'],
		},
		talent: {
			book: [
				'Teachings of Ballad',
				'Guide to Ballad',
				'Philosophies of Ballad',
			],
			boss: "Dvalin's Claw",
			common: commonMaterials['Slime'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Mona',
		ascension: {
			gem: 'Varunada Lazurite',
			boss: 'Cleansing Heart',
			local: 'Philanemo Mushroom',
			common: commonMaterials['Whopperflower Nectar'],
		},
		talent: {
			book: [
				'Teachings of Resistance',
				'Guide to Resistance',
				'Philosophies of Resistance',
			],
			boss: 'Ring of Boreas',
			common: commonMaterials['Whopperflower Nectar'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Ningguang',
		ascension: {
			gem: 'Prithiva Topaz',
			boss: 'Basalt Pillar',
			local: 'Glaze Lily',
			common: commonMaterials['Fatui Insignia'],
		},
		talent: {
			book: [
				'Teachings of Prosperity',
				'Guide to Prosperity',
				'Philosophies of Prosperity',
			],
			boss: 'Spirit Locket of Boreas',
			common: commonMaterials['Fatui Insignia'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Noelle',
		ascension: {
			gem: 'Prithiva Topaz',
			boss: 'Basalt Pillar',
			local: 'Valberry',
			common: commonMaterials['Hilichurl Masks'],
		},
		talent: {
			book: [
				'Teachings of Resistance',
				'Guide to Resistance',
				'Philosophies of Resistance',
			],
			boss: "Dvalin's Claw",
			common: commonMaterials['Hilichurl Masks'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Qiqi',
		ascension: {
			gem: 'Shivada Jade',
			boss: 'Hoarfrost Core',
			local: 'Violetgrass',
			common: commonMaterials['Samachurl Scrolls'],
		},
		talent: {
			book: [
				'Teachings of Prosperity',
				'Guide to Prosperity',
				'Philosophies of Prosperity',
			],
			boss: 'Tail of Boreas',
			common: commonMaterials['Samachurl Scrolls'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Raiden Shogun',
		ascension: {
			gem: 'Vajrada Amethyst',
			boss: 'Storm Beads',
			local: 'Amakumo Fruit',
			common: commonMaterials['Nobushi Handguards'],
		},
		talent: {
			book: ['Teachings of Light', 'Guide to Light', 'Philosophies of Light'],
			boss: 'Molten Moment',
			common: commonMaterials['Nobushi Handguards'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Razor',
		ascension: {
			gem: 'Vajrada Amethyst',
			boss: 'Lightning Prism',
			local: 'Wolfhook',
			common: commonMaterials['Hilichurl Masks'],
		},
		talent: {
			book: [
				'Teachings of Resistance',
				'Guide to Resistance',
				'Philosophies of Resistance',
			],
			boss: "Dvalin's Claw",
			common: commonMaterials['Hilichurl Masks'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Rosaria',
		ascension: {
			gem: 'Shivada Jade',
			boss: 'Hoarfrost Core',
			local: 'Valberry',
			common: commonMaterials['Fatui Insignia'],
		},
		talent: {
			book: [
				'Teachings of Ballad',
				'Guide to Ballad',
				'Philosophies of Ballad',
			],
			boss: 'Shadow of the Warrior',
			common: commonMaterials['Fatui Insignia'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Sangonomiya Kokomi',
		ascension: {
			gem: 'Varunada Lazurite',
			boss: 'Dew of Repudiation',
			local: 'Sango Pearl',
			common: commonMaterials['Spectral Cores'],
		},
		talent: {
			book: [
				'Teachings of Transience',
				'Guide to Transience',
				'Philosophies of Transience',
			],
			boss: 'Hellfire Butterfly',
			common: commonMaterials['Spectral Cores'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Sayu',
		ascension: {
			gem: 'Vayuda Turquoise',
			boss: 'Marionette Core',
			local: 'Crystal Marrow',
			common: commonMaterials['Whopperflower Nectar'],
		},
		talent: {
			book: ['Teachings of Light', 'Guide to Light', 'Philosophies of Light'],
			boss: 'Gilded Scale',
			common: commonMaterials['Whopperflower Nectar'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Shenhe',
		ascension: {
			gem: 'Shivada Jade',
			boss: "Dragonheir's False Fin",
			local: 'Qingxin',
			common: commonMaterials['Whopperflower Nectar'],
		},
		talent: {
			book: [
				'Teachings of Prosperity',
				'Guide to Prosperity',
				'Philosophies of Prosperity',
			],
			boss: 'Hellfire Butterfly',
			common: commonMaterials['Whopperflower Nectar'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Sucrose',
		ascension: {
			gem: 'Vayuda Turquoise',
			boss: 'Hurricane Seed',
			local: 'Windwheel Aster',
			common: commonMaterials['Whopperflower Nectar'],
		},
		talent: {
			book: [
				'Teachings of Freedom',
				'Guide to Freedom',
				'Philosophies of Freedom',
			],
			boss: 'Spirit Locket of Boreas',
			common: commonMaterials['Whopperflower Nectar'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Tartaglia',
		ascension: {
			gem: 'Varunada Lazurite',
			boss: 'Cleansing Heart',
			local: 'Starconch',
			common: commonMaterials['Fatui Insignia'],
		},
		talent: {
			book: [
				'Teachings of Freedom',
				'Guide to Freedom',
				'Philosophies of Freedom',
			],
			boss: 'Shard of a Foul Legacy',
			common: commonMaterials['Fatui Insignia'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Thoma',
		ascension: {
			gem: 'Agnidus Agate',
			boss: 'Smoldering Pearl',
			local: 'Fluorescent Fungus',
			common: commonMaterials['Treasure Hoarder Insignias'],
		},
		talent: {
			book: [
				'Teachings of Transience',
				'Guide to Transience',
				'Philosophies of Transience',
			],
			boss: 'Hellfire Butterfly',
			common: commonMaterials['Treasure Hoarder Insignias'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Venti',
		ascension: {
			gem: 'Vayuda Turquoise',
			boss: 'Hurricane Seed',
			local: 'Qingxin',
			common: commonMaterials['Slime'],
		},
		talent: {
			book: [
				'Teachings of Ballad',
				'Guide to Ballad',
				'Philosophies of Ballad',
			],
			boss: 'Tail of Boreas',
			common: commonMaterials['Slime'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Xiangling',
		ascension: {
			gem: 'Agnidus Agate',
			boss: 'Everflame Seed',
			local: 'Jueyun Chili',
			common: commonMaterials['Slime'],
		},
		talent: {
			book: [
				'Teachings of Diligence',
				'Guide to Diligence',
				'Philosophies of Diligence',
			],
			boss: "Dvalin's Claw",
			common: commonMaterials['Slime'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Xiao',
		ascension: {
			gem: 'Vayuda Turquoise',
			boss: 'Juvenile Jade',
			local: 'Qingxin',
			common: commonMaterials['Slime'],
		},
		talent: {
			book: [
				'Teachings of Prosperity',
				'Guide to Prosperity',
				'Philosophies of Prosperity',
			],
			boss: 'Shadow of the Warrior',
			common: commonMaterials['Slime'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Xingqiu',
		ascension: {
			gem: 'Varunada Lazurite',
			boss: 'Cleansing Heart',
			local: 'Silk Flower',
			common: commonMaterials['Hilichurl Masks'],
		},
		talent: {
			book: ['Teachings of Gold', 'Guide to Gold', 'Philosophies of Gold'],
			boss: 'Tail of Boreas',
			common: commonMaterials['Hilichurl Masks'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Xinyan',
		ascension: {
			gem: 'Agnidus Agate',
			boss: 'Everflame Seed',
			local: 'Violetgrass',
			common: commonMaterials['Treasure Hoarder Insignias'],
		},
		talent: {
			book: ['Teachings of Gold', 'Guide to Gold', 'Philosophies of Gold'],
			boss: 'Tusk of Monoceros Caeli',
			common: commonMaterials['Treasure Hoarder Insignias'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Yae Miko',
		ascension: {
			gem: 'Vajrada Amethyst',
			boss: "Dragonheir's False Fin",
			local: 'Sea Ganoderma',
			common: commonMaterials['Nobushi Handguards'],
		},
		talent: {
			book: ['Teachings of Light', 'Guide to Light', 'Philosophies of Light'],
			boss: 'The Meaning of Aeons',
			common: commonMaterials['Nobushi Handguards'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Yanfei',
		ascension: {
			gem: 'Agnidus Agate',
			boss: 'Juvenile Jade',
			local: 'Noctilucous Jade',
			common: commonMaterials['Treasure Hoarder Insignias'],
		},
		talent: {
			book: ['Teachings of Gold', 'Guide to Gold', 'Philosophies of Gold'],
			boss: 'Bloodjade Branch',
			common: commonMaterials['Treasure Hoarder Insignias'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Yelan',
		ascension: {
			gem: 'Varunada Lazurite',
			boss: 'Runic Fang',
			local: 'Starconch',
			common: commonMaterials['Treasure Hoarder Insignias'],
		},
		talent: {
			book: [
				'Teachings of Prosperity',
				'Guide to Prosperity',
				'Philosophies of Prosperity',
			],
			boss: 'Gilded Scale',
			common: commonMaterials['Treasure Hoarder Insignias'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Yoimiya',
		ascension: {
			gem: 'Agnidus Agate',
			boss: 'Smoldering Pearl',
			local: 'Naku Weed',
			common: commonMaterials['Samachurl Scrolls'],
		},
		talent: {
			book: [
				'Teachings of Transience',
				'Guide to Transience',
				'Philosophies of Transience',
			],
			boss: "Dragon Lord's Crown",
			common: commonMaterials['Samachurl Scrolls'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Yun Jin',
		ascension: {
			gem: 'Prithiva Topaz',
			boss: 'Riftborn Regalia',
			local: 'Glaze Lily',
			common: commonMaterials['Hilichurl Masks'],
		},
		talent: {
			book: [
				'Teachings of Diligence',
				'Guide to Diligence',
				'Philosophies of Diligence',
			],
			boss: 'Ashen Heart',
			common: commonMaterials['Hilichurl Masks'],
			special: 'Crown of Insight',
		},
	},
	{
		name: 'Zhongli',
		ascension: {
			gem: 'Prithiva Topaz',
			boss: 'Basalt Pillar',
			local: 'Cor Lapis',
			common: commonMaterials['Slime'],
		},
		talent: {
			book: ['Teachings of Gold', 'Guide to Gold', 'Philosophies of Gold'],
			boss: 'Tusk of Monoceros Caeli',
			common: commonMaterials['Slime'],
			special: 'Crown of Insight',
		},
	},
]

const travelerMaterial = [
	{
		vision: 'Anemo',
		ascension: {
			gem: 'Brilliant Diamond',
			local: 'Windwheel Aster',
			common: commonMaterials['Hilichurl Masks'],
		},
		talent: {
			book: [
				'Teachings of Freedom',
				'Guide to Resistance',
				'Guide to Ballad',
				'Guide to Freedom',
				'Guide to Resistance',
				'Philosophies of Ballad',
				'Philosophies of Freedom',
				'Philosophies of Resistance',
				'Philosophies of Ballad',
			],
			boss: "Dvalin's Sigh",
			common: commonMaterials['Samachurl Scrolls'],
			special: 'Crown of Insight',
		},
	},
	{
		vision: 'Geo',
		ascension: {
			gem: 'Brilliant Diamond',
			localSpecialty: 'Windwheel Aster',
			common: commonMaterials['Hilichurl Masks'],
		},
		talent: [
			{
				book: [
					'Teachings of Freedom',
					'Guide to Resistance',
					'Guide to Ballad',
					'Guide to Freedom',
					'Guide to Resistance',
					'Philosophies of Ballad',
					'Philosophies of Freedom',
					'Philosophies of Resistance',
					'Philosophies of Ballad',
				],
				boss: "Dvalin's Sigh",
				common: commonMaterials['Samachurl Scrolls'],
				special: 'Crown of Insight',
			},
			{
				book: [
					'Teachings of Prosperity',
					'Guide to Diligence',
					'Guide to Gold',
					'Guide to Prosperity',
					'Guide to Diligence',
					'Philosophies of Gold',
					'Philosophies of Prosperity',
					'Philosophies of Diligence',
					'Philosophies of Gold',
				],
				boss: 'Tail of Boreas',
				common: commonMaterials['Hilichurl Arrowheads'],
				special: 'Crown of Insight',
			},
			{
				book: [
					'Teachings of Prosperity',
					'Guide to Diligence',
					'Guide to Gold',
					'Guide to Prosperity',
					'Guide to Diligence',
					'Philosophies of Gold',
					'Philosophies of Prosperity',
					'Philosophies of Diligence',
					'Philosophies of Gold',
				],
				boss: 'Tail of Boreas',
				common: commonMaterials['Hilichurl Arrowheads'],
				special: 'Crown of Insight',
			},
		],
	},
	{
		vision: 'Electro',
		ascension: {
			gem: 'Brilliant Diamond',
			localSpecialty: 'Windwheel Aster',
			common: commonMaterials['Hilichurl Masks'],
		},
		talent: {
			book: [
				'Teachings of Transience',
				'Guide to Elegance',
				'Guide to Light',
				'Guide to Transience',
				'Guide to Elegance',
				'Philosophies of Light',
				'Philosophies of Transience',
				'Philosophies of Elegance',
				'Philosophies of Light',
			],
			boss: "Dragon Lord's Crown",
			common: commonMaterials['Nobushi Handguards'],
			special: 'Crown of Insight',
		},
	},
]

export interface TravelerAscension {
	phase: { from: number; to: number }
	mora: number
	common: { name: string; quantity: number }
	gem: { name: string; quantity: number }
	local: { name: string; quantity: number }
}

export interface CharacterAscension extends TravelerAscension {
	boss?: { name: string; quantity: number }
}

export interface CharacterTalent {
	level: { from: number; to: number }
	mora: number
	common: { name: string; quantity: number }
	book: { name: string; quantity: number }
	boss?: { name: string; quantity: number }
	special?: { name: string; quantity: number }
}

export function getTravelerRequiredMaterial({ vision }: { vision: string }) {
	const traveler = travelerMaterial.find(
		(traveler) => traveler.vision === vision
	)
	invariant(traveler)

	const ascensionMaterial: TravelerAscension[] = [
		{
			phase: { from: 0, to: 1 },
			mora: 20_000,
			common: { name: 'Damaged Mask', quantity: 3 },
			gem: { name: 'Brilliant Diamond Sliver', quantity: 1 },
			local: { name: 'Windwheel Aster', quantity: 3 },
		},
		{
			phase: { from: 1, to: 2 },
			mora: 40_000,
			common: { name: 'Damaged Mask', quantity: 15 },
			gem: { name: 'Brilliant Diamond Fragment', quantity: 3 },
			local: { name: 'Windwheel Aster', quantity: 10 },
		},
		{
			phase: { from: 2, to: 3 },
			mora: 60_000,
			common: { name: 'Stained Mask', quantity: 12 },
			gem: { name: 'Brilliant Diamond Fragment', quantity: 6 },
			local: { name: 'Windwheel Aster', quantity: 20 },
		},
		{
			phase: { from: 3, to: 4 },
			mora: 80_000,
			common: { name: 'Stained Mask', quantity: 18 },
			gem: { name: 'Brilliant Diamond Chunk', quantity: 3 },
			local: { name: 'Windwheel Aster', quantity: 30 },
		},
		{
			phase: { from: 4, to: 5 },
			mora: 100_000,
			common: { name: 'Ominous Mask', quantity: 12 },
			gem: { name: 'Brilliant Diamond Chunk', quantity: 6 },
			local: { name: 'Windwheel Aster', quantity: 45 },
		},
		{
			phase: { from: 5, to: 6 },
			mora: 120_000,
			common: { name: 'Ominous Mask', quantity: 24 },
			gem: { name: 'Brilliant Diamond Gemstone', quantity: 6 },
			local: { name: 'Windwheel Aster', quantity: 60 },
		},
	]

	if (Array.isArray(traveler.talent)) {
		return {
			ascensionMaterial,
			talentMaterial: {
				normal: getCharacterTalentMaterial(traveler.talent[0], {
					isTraveler: true,
				}),
				elemental: getCharacterTalentMaterial(traveler.talent[1], {
					isTraveler: true,
				}),
			},
		}
	}

	return {
		ascensionMaterial,
		talentMaterial: {
			normal: getCharacterTalentMaterial(traveler.talent, { isTraveler: true }),
			elemental: getCharacterTalentMaterial(traveler.talent, {
				isTraveler: true,
			}),
		},
	}
}

export function getCharacterRequiredMaterial({ name }: { name: string }) {
	const character = characterMaterial.find(
		(character) => character.name === name
	)
	invariant(character)

	return {
		ascensionMaterial: getCharacterAscensionMaterial(character.ascension),
		talentMaterial: getCharacterTalentMaterial(character.talent),
	}
}

function getCharacterAscensionMaterial({
	gem,
	boss,
	local,
	common,
}: CharacterMaterial['ascension']): CharacterAscension[] {
	return [
		{
			phase: { from: 0, to: 1 },
			mora: 20_000,
			common: { name: common[1], quantity: 3 },
			gem: { name: `${gem} Sliver`, quantity: 1 },
			local: { name: local, quantity: 3 },
		},
		{
			phase: { from: 1, to: 2 },
			mora: 40_000,
			common: { name: common[1], quantity: 15 },
			gem: { name: `${gem} Fragment`, quantity: 3 },
			local: { name: local, quantity: 10 },
			boss: { name: boss, quantity: 2 },
		},
		{
			phase: { from: 2, to: 3 },
			mora: 60_000,
			common: { name: common[1], quantity: 12 },
			gem: { name: `${gem} Fragment`, quantity: 6 },
			local: { name: local, quantity: 20 },
			boss: { name: boss, quantity: 4 },
		},
		{
			phase: { from: 3, to: 4 },
			mora: 80_000,
			common: { name: common[1], quantity: 18 },
			gem: { name: `${gem} Chunk`, quantity: 3 },
			local: { name: local, quantity: 30 },
			boss: { name: boss, quantity: 8 },
		},
		{
			phase: { from: 4, to: 5 },
			mora: 100_000,
			common: { name: common[2], quantity: 12 },
			gem: { name: `${gem} Chunk`, quantity: 6 },
			local: { name: local, quantity: 45 },
			boss: { name: boss, quantity: 12 },
		},
		{
			phase: { from: 5, to: 6 },
			mora: 120_000,
			common: { name: common[2], quantity: 24 },
			gem: { name: `${gem} Gemstone`, quantity: 6 },
			local: { name: local, quantity: 60 },
			boss: { name: boss, quantity: 20 },
		},
	]
}

function getCharacterTalentMaterial(
	{ book, boss, common, special }: CharacterMaterial['talent'],
	options?: { isTraveler: boolean }
): CharacterTalent[] {
	const isTraveler = options?.isTraveler ?? false

	return [
		{
			level: { from: 1, to: 2 },
			mora: 12_500,
			common: { name: common[0], quantity: 3 },
			book: { name: book[0], quantity: 3 },
		},
		{
			level: { from: 2, to: 3 },
			mora: 17_500,
			common: { name: common[1], quantity: 3 },
			book: { name: book[1], quantity: 2 },
		},
		{
			level: { from: 3, to: 4 },
			mora: 25_000,
			common: { name: common[1], quantity: 4 },
			book: { name: book[isTraveler ? 2 : 1], quantity: 4 },
		},
		{
			level: { from: 4, to: 5 },
			mora: 30_000,
			common: { name: common[1], quantity: 6 },
			book: { name: book[isTraveler ? 3 : 1], quantity: 6 },
		},
		{
			level: { from: 5, to: 6 },
			mora: 37_500,
			common: { name: common[1], quantity: 9 },
			book: { name: book[isTraveler ? 4 : 1], quantity: 9 },
		},
		{
			level: { from: 6, to: 7 },
			mora: 120_000,
			common: { name: common[2], quantity: 4 },
			book: { name: book[isTraveler ? 5 : 2], quantity: 4 },
			boss: { name: boss, quantity: 1 },
		},
		{
			level: { from: 7, to: 8 },
			mora: 260_000,
			common: { name: common[2], quantity: 6 },
			book: { name: book[isTraveler ? 6 : 2], quantity: 6 },
			boss: { name: boss, quantity: 1 },
		},
		{
			level: { from: 8, to: 9 },
			mora: 450_000,
			common: { name: common[2], quantity: 9 },
			book: { name: book[isTraveler ? 7 : 2], quantity: 12 },
			boss: { name: boss, quantity: 2 },
		},
		{
			level: { from: 9, to: 10 },
			mora: 700_000,
			common: { name: common[2], quantity: 12 },
			book: { name: book[isTraveler ? 8 : 2], quantity: 16 },
			boss: { name: boss, quantity: 2 },
			special: { name: special, quantity: 1 },
		},
	]
}

function narrowErrors(errors: Zod.ZodIssue[]): { [key: string]: string } {
	return Object.assign(
		{},
		...errors.map((error) => ({
			[error.path[0]]: error.message,
		}))
	)
}

export function validateAscensionRequirement({
	level,
	ascension,
	normalAttack,
	elementalSkill,
	elementalBurst,
}: Omit<CharacterData, 'name'>) {
	switch (ascension) {
		case 0:
			const schema0 = Zod.object({
				level: Zod.number().refine((val) => val <= 20, {
					message: 'Maximum level on ascension 0 is 20',
				}),
				normalAttack: Zod.number().refine((val) => val <= 1, {
					message: 'Maximum normal attack on ascension 0 is 1',
				}),
				elementalSkill: Zod.number().refine((val) => val <= 1, {
					message: 'Maximum elemental skill on ascension 0 is 1',
				}),
				elementalBurst: Zod.number().refine((val) => val <= 1, {
					message: 'Maximum elemental burst on ascension 0 is 1',
				}),
			})

			const parsed0 = schema0.safeParse({
				level,
				normalAttack,
				elementalSkill,
				elementalBurst,
			})

			if (!parsed0.success) {
				return narrowErrors(parsed0.error.issues)
			}

			return
		case 1:
			const schema1 = Zod.object({
				level: Zod.number().refine((val) => val <= 40, {
					message: 'Maximum level on ascension 1 is 40',
				}),
				normalAttack: Zod.number().refine((val) => val <= 1, {
					message: 'Maximum normal attack on ascension 1 is 1',
				}),
				elementalSkill: Zod.number().refine((val) => val <= 1, {
					message: 'Maximum elemental skill on ascension 1 is 1',
				}),
				elementalBurst: Zod.number().refine((val) => val <= 1, {
					message: 'Maximum elemental burst on ascension 1 is 1',
				}),
			})

			const parsed1 = schema1.safeParse({
				level,
				normalAttack,
				elementalSkill,
				elementalBurst,
			})

			if (!parsed1.success) {
				return narrowErrors(parsed1.error.issues)
			}

			return
		case 2:
			const schema2 = Zod.object({
				level: Zod.number().refine((val) => val <= 50, {
					message: 'Maximum level on ascension 2 is 50',
				}),
				normalAttack: Zod.number().refine((val) => val <= 2, {
					message: 'Maximum normal attack on ascension 2 is 2',
				}),
				elementalSkill: Zod.number().refine((val) => val <= 2, {
					message: 'Maximum elemental skill on ascension 2 is 2',
				}),
				elementalBurst: Zod.number().refine((val) => val <= 2, {
					message: 'Maximum elemental burst on ascension 2 is 2',
				}),
			})

			const parsed2 = schema2.safeParse({
				level,
				normalAttack,
				elementalSkill,
				elementalBurst,
			})

			if (!parsed2.success) {
				return narrowErrors(parsed2.error.issues)
			}

			return
		case 3:
			const schema3 = Zod.object({
				level: Zod.number().refine((val) => val <= 60, {
					message: 'Maximum level on ascension 3 is 60',
				}),
				normalAttack: Zod.number().refine((val) => val <= 4, {
					message: 'Maximum normal attack on ascension 3 is 4',
				}),
				elementalSkill: Zod.number().refine((val) => val <= 4, {
					message: 'Maximum elemental skill on ascension 3 is 4',
				}),
				elementalBurst: Zod.number().refine((val) => val <= 4, {
					message: 'Maximum elemental burst on ascension 3 is 4',
				}),
			})

			const parsed3 = schema3.safeParse({
				level,
				normalAttack,
				elementalSkill,
				elementalBurst,
			})

			if (!parsed3.success) {
				return narrowErrors(parsed3.error.issues)
			}

			return
		case 4:
			const schema4 = Zod.object({
				level: Zod.number().refine((val) => val <= 70, {
					message: 'Maximum level on ascension 4 is 70',
				}),
				normalAttack: Zod.number().refine((val) => val <= 6, {
					message: 'Maximum normal attack on ascension 4 is 6',
				}),
				elementalSkill: Zod.number().refine((val) => val <= 6, {
					message: 'Maximum elemental skill on ascension 4 is 6',
				}),
				elementalBurst: Zod.number().refine((val) => val <= 6, {
					message: 'Maximum elemental burst on ascension 4 is 6',
				}),
			})

			const parsed4 = schema4.safeParse({
				level,
				normalAttack,
				elementalSkill,
				elementalBurst,
			})

			if (!parsed4.success) {
				return narrowErrors(parsed4.error.issues)
			}

			return
		case 5:
			const schema5 = Zod.object({
				level: Zod.number().refine((val) => val <= 80, {
					message: 'Maximum level on ascension 5 is 80',
				}),
				normalAttack: Zod.number().refine((val) => val <= 8, {
					message: 'Maximum normal attack on ascension 5 is 8',
				}),
				elementalSkill: Zod.number().refine((val) => val <= 8, {
					message: 'Maximum elemental skill on ascension 5 is 8',
				}),
				elementalBurst: Zod.number().refine((val) => val <= 8, {
					message: 'Maximum elemental burst on ascension 5 is 8',
				}),
			})

			const parsed5 = schema5.safeParse({
				level,
				normalAttack,
				elementalSkill,
				elementalBurst,
			})

			if (!parsed5.success) {
				return narrowErrors(parsed5.error.issues)
			}

			return
		case 6:
			const schema6 = Zod.object({
				level: Zod.number().refine((val) => val <= 90, {
					message: 'Maximum level on ascension 6 is 90',
				}),
				normalAttack: Zod.number().refine((val) => val <= 10, {
					message: 'Maximum normal attack on ascension 6 is 10',
				}),
				elementalSkill: Zod.number().refine((val) => val <= 10, {
					message: 'Maximum elemental skill on ascension 6 is 10',
				}),
				elementalBurst: Zod.number().refine((val) => val <= 10, {
					message: 'Maximum elemental burst on ascension 6 is 10',
				}),
			})

			const parsed6 = schema6.safeParse({
				level,
				normalAttack,
				elementalSkill,
				elementalBurst,
			})

			if (!parsed6.success) {
				return narrowErrors(parsed6.error.issues)
			}

			return
		default:
			invariant(false, 'IMPOSSIBLE')
	}
}
