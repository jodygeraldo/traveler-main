import * as Prisma from '@prisma/client'

export async function seed(prisma: Prisma.PrismaClient) {
  await prisma.character.deleteMany()

  return prisma.character.createMany({
    data: characters,
  })
}

const characters = [
  {
    name: 'Albedo',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.GEO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 5,
  },
  {
    name: 'Aloy',
    region: Prisma.Region.UNKNOWN,
    vision: Prisma.Vision.CRYO,
    weapon: Prisma.Weapon.BOW,
    rarity: 5,
  },
  {
    name: 'Amber',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.PYRO,
    weapon: Prisma.Weapon.BOW,
    rarity: 4,
  },
  {
    name: 'Arataki Itto',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.GEO,
    weapon: Prisma.Weapon.CLAYMORE,
    rarity: 5,
  },
  {
    name: 'Barbara',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.HYDRO,
    weapon: Prisma.Weapon.CATALYST,
    rarity: 4,
  },
  {
    name: 'Beidou',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.ELECTRO,
    weapon: Prisma.Weapon.CLAYMORE,
    rarity: 4,
  },
  {
    name: 'Bennett',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.PYRO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 4,
  },
  {
    name: 'Chongyun',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.CRYO,
    weapon: Prisma.Weapon.CLAYMORE,
    rarity: 4,
  },
  {
    name: 'Diluc',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.PYRO,
    weapon: Prisma.Weapon.CLAYMORE,
    rarity: 5,
  },
  {
    name: 'Diona',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.CRYO,
    weapon: Prisma.Weapon.BOW,
    rarity: 4,
  },
  {
    name: 'Eula',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.CRYO,
    weapon: Prisma.Weapon.CLAYMORE,
    rarity: 5,
  },
  {
    name: 'Fischl',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.ELECTRO,
    weapon: Prisma.Weapon.BOW,
    rarity: 4,
  },
  {
    name: 'Ganyu',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.CRYO,
    weapon: Prisma.Weapon.BOW,
    rarity: 5,
  },
  {
    name: 'Gorou',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.GEO,
    weapon: Prisma.Weapon.BOW,
    rarity: 4,
  },
  {
    name: 'Hu Tao',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.PYRO,
    weapon: Prisma.Weapon.POLEARM,
    rarity: 5,
  },
  {
    name: 'Jean',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.ANEMO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 5,
  },
  {
    name: 'Kaedehara Kazuha',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.ANEMO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 5,
  },
  {
    name: 'Kaeya',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.CRYO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 5,
  },
  {
    name: 'Kamisato Ayaka',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.CRYO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 5,
  },
  {
    name: 'Kamisato Ayato',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.HYDRO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 5,
  },
  {
    name: 'Keqing',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.ELECTRO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 5,
  },
  {
    name: 'Klee',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.PYRO,
    weapon: Prisma.Weapon.CATALYST,
    rarity: 5,
  },
  {
    name: 'Kujou Sara',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.ELECTRO,
    weapon: Prisma.Weapon.BOW,
    rarity: 4,
  },
  {
    name: 'Kuki Shinobu',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.ELECTRO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 4,
  },
  {
    name: 'Lisa',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.ELECTRO,
    weapon: Prisma.Weapon.CATALYST,
    rarity: 4,
  },
  {
    name: 'Mona',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.HYDRO,
    weapon: Prisma.Weapon.CATALYST,
    rarity: 5,
  },
  {
    name: 'Ningguang',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.ELECTRO,
    weapon: Prisma.Weapon.CATALYST,
    rarity: 4,
  },
  {
    name: 'Noelle',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.GEO,
    weapon: Prisma.Weapon.CLAYMORE,
    rarity: 4,
  },
  {
    name: 'Qiqi',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.CRYO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 5,
  },
  {
    name: 'Raiden Shogun',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.ELECTRO,
    weapon: Prisma.Weapon.POLEARM,
    rarity: 5,
  },
  {
    name: 'Razor',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.ELECTRO,
    weapon: Prisma.Weapon.CLAYMORE,
    rarity: 4,
  },
  {
    name: 'Rosaria',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.CRYO,
    weapon: Prisma.Weapon.POLEARM,
    rarity: 4,
  },
  {
    name: 'Sangonomiya Kokomi',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.HYDRO,
    weapon: Prisma.Weapon.CATALYST,
    rarity: 5,
  },
  {
    name: 'Sayu',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.ANEMO,
    weapon: Prisma.Weapon.CLAYMORE,
    rarity: 4,
  },
  {
    name: 'Shenhe',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.CRYO,
    weapon: Prisma.Weapon.POLEARM,
    rarity: 5,
  },
  {
    name: 'Sucrose',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.ANEMO,
    weapon: Prisma.Weapon.CATALYST,
    rarity: 4,
  },
  {
    name: 'Tartaglia',
    region: Prisma.Region.SNEZHNAYA,
    vision: Prisma.Vision.HYDRO,
    weapon: Prisma.Weapon.BOW,
    rarity: 5,
  },
  {
    name: 'Thoma',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.PYRO,
    weapon: Prisma.Weapon.POLEARM,
    rarity: 4,
  },
  {
    name: 'Traveler Anemo',
    region: Prisma.Region.UNKNOWN,
    vision: Prisma.Vision.ANEMO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 5,
  },
  {
    name: 'Traveler Geo',
    region: Prisma.Region.UNKNOWN,
    vision: Prisma.Vision.GEO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 5,
  },
  {
    name: 'Traveler Electro',
    region: Prisma.Region.UNKNOWN,
    vision: Prisma.Vision.ELECTRO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 5,
  },
  {
    name: 'Venti',
    region: Prisma.Region.MONDSTADT,
    vision: Prisma.Vision.ANEMO,
    weapon: Prisma.Weapon.BOW,
    rarity: 5,
  },
  {
    name: 'Xiangling',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.PYRO,
    weapon: Prisma.Weapon.POLEARM,
    rarity: 4,
  },
  {
    name: 'Xiao',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.ANEMO,
    weapon: Prisma.Weapon.POLEARM,
    rarity: 5,
  },
  {
    name: 'Xingqiu',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.HYDRO,
    weapon: Prisma.Weapon.SWORD,
    rarity: 4,
  },
  {
    name: 'Xinyan',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.PYRO,
    weapon: Prisma.Weapon.CLAYMORE,
    rarity: 4,
  },
  {
    name: 'Yae Miko',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.ELECTRO,
    weapon: Prisma.Weapon.CATALYST,
    rarity: 5,
  },
  {
    name: 'Yanfei',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.PYRO,
    weapon: Prisma.Weapon.CATALYST,
    rarity: 4,
  },
  {
    name: 'Yelan',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.HYDRO,
    weapon: Prisma.Weapon.BOW,
    rarity: 5,
  },
  {
    name: 'Yoimiya',
    region: Prisma.Region.INAZUMA,
    vision: Prisma.Vision.PYRO,
    weapon: Prisma.Weapon.BOW,
    rarity: 5,
  },
  {
    name: 'Yun Jin',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.GEO,
    weapon: Prisma.Weapon.POLEARM,
    rarity: 4,
  },
  {
    name: 'Zhongli',
    region: Prisma.Region.LIYUE,
    vision: Prisma.Vision.GEO,
    weapon: Prisma.Weapon.POLEARM,
    rarity: 5,
  },
]