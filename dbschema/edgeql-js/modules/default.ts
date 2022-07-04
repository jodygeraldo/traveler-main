import { $ } from 'edgedb'
import * as _ from '../imports'
import type * as _std from './std'
enum $RegionλEnum {
  Mondstadt = 'Mondstadt',
  Liyue = 'Liyue',
  Inazuma = 'Inazuma',
  Sumeru = 'Sumeru',
  Fontaine = 'Fontaine',
  Natlan = 'Natlan',
  Snezhnaya = 'Snezhnaya',
}
export type $Region = {
  Mondstadt: $.$expr_Literal<$Region>
  Liyue: $.$expr_Literal<$Region>
  Inazuma: $.$expr_Literal<$Region>
  Sumeru: $.$expr_Literal<$Region>
  Fontaine: $.$expr_Literal<$Region>
  Natlan: $.$expr_Literal<$Region>
  Snezhnaya: $.$expr_Literal<$Region>
} & $.EnumType<'default::Region', `${$RegionλEnum}`>
const Region: $Region = $.makeType<$Region>(
  _.spec,
  '4d6490a3-f7c2-11ec-bd80-dd445745584a',
  _.syntax.literal
)

enum $VisionλEnum {
  Anemo = 'Anemo',
  Cryo = 'Cryo',
  Dendro = 'Dendro',
  Electro = 'Electro',
  Geo = 'Geo',
  Hydro = 'Hydro',
  Pyro = 'Pyro',
}
export type $Vision = {
  Anemo: $.$expr_Literal<$Vision>
  Cryo: $.$expr_Literal<$Vision>
  Dendro: $.$expr_Literal<$Vision>
  Electro: $.$expr_Literal<$Vision>
  Geo: $.$expr_Literal<$Vision>
  Hydro: $.$expr_Literal<$Vision>
  Pyro: $.$expr_Literal<$Vision>
} & $.EnumType<'default::Vision', `${$VisionλEnum}`>
const Vision: $Vision = $.makeType<$Vision>(
  _.spec,
  '4d64a495-f7c2-11ec-b699-91e361f033a6',
  _.syntax.literal
)

enum $WeaponλEnum {
  Bow = 'Bow',
  Catalyst = 'Catalyst',
  Claymore = 'Claymore',
  Polearm = 'Polearm',
  Sword = 'Sword',
}
export type $Weapon = {
  Bow: $.$expr_Literal<$Weapon>
  Catalyst: $.$expr_Literal<$Weapon>
  Claymore: $.$expr_Literal<$Weapon>
  Polearm: $.$expr_Literal<$Weapon>
  Sword: $.$expr_Literal<$Weapon>
} & $.EnumType<'default::Weapon', `${$WeaponλEnum}`>
const Weapon: $Weapon = $.makeType<$Weapon>(
  _.spec,
  '4d64b7d9-f7c2-11ec-958c-7908a0eb3c07',
  _.syntax.literal
)

export type $AccountλShape = $.typeutil.flatten<
  _std.$Object_906a01bad55611ec888b072cfc45e0d2λShape & {
    name: $.PropertyDesc<
      _std.$str,
      $.Cardinality.One,
      false,
      false,
      false,
      true
    >
    characters: $.LinkDesc<
      $UserCharacter,
      $.Cardinality.AtMostOne,
      {},
      false,
      true,
      false,
      false
    >
    inventory: $.LinkDesc<
      $Inventory,
      $.Cardinality.AtMostOne,
      {},
      false,
      true,
      false,
      false
    >
    owner: $.LinkDesc<$User, $.Cardinality.One, {}, true, false, false, false>
    '<accounts[is User]': $.LinkDesc<
      $User,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<owner[is Inventory]': $.LinkDesc<
      $Inventory,
      $.Cardinality.AtMostOne,
      {},
      true,
      false,
      false,
      false
    >
    '<owner[is UserCharacter]': $.LinkDesc<
      $UserCharacter,
      $.Cardinality.AtMostOne,
      {},
      true,
      false,
      false,
      false
    >
    '<accounts': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<owner': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $Account = $.ObjectType<'default::Account', $AccountλShape, null>
const $Account = $.makeType<$Account>(
  _.spec,
  '4d61bbd8-f7c2-11ec-a7d0-cfb1a5106ed6',
  _.syntax.literal
)

const Account: $.$expr_PathNode<
  $.TypeSet<$Account, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode($.$toSet($Account, $.Cardinality.Many), null, true)

export type $ItemλShape = $.typeutil.flatten<
  _std.$Object_906a01bad55611ec888b072cfc45e0d2λShape & {
    name: $.PropertyDesc<
      _std.$str,
      $.Cardinality.One,
      true,
      false,
      false,
      false
    >
    rarity: $.PropertyDesc<
      _std.$int16,
      $.Cardinality.One,
      false,
      false,
      false,
      false
    >
  }
>
type $Item = $.ObjectType<'default::Item', $ItemλShape, null>
const $Item = $.makeType<$Item>(
  _.spec,
  '4da0c115-f7c2-11ec-94be-49305d728fb6',
  _.syntax.literal
)

const Item: $.$expr_PathNode<
  $.TypeSet<$Item, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode($.$toSet($Item, $.Cardinality.Many), null, true)

export type $AscensionBossMaterialλShape = $.typeutil.flatten<
  $ItemλShape & {
    '<ascension_boss[is Inventory]': $.LinkDesc<
      $Inventory,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<ascension_boss': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $AscensionBossMaterial = $.ObjectType<
  'default::AscensionBossMaterial',
  $AscensionBossMaterialλShape,
  null
>
const $AscensionBossMaterial = $.makeType<$AscensionBossMaterial>(
  _.spec,
  '4da66dfb-f7c2-11ec-aa02-9b3a37224003',
  _.syntax.literal
)

const AscensionBossMaterial: $.$expr_PathNode<
  $.TypeSet<$AscensionBossMaterial, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode(
  $.$toSet($AscensionBossMaterial, $.Cardinality.Many),
  null,
  true
)

export type $AscensionGemλShape = $.typeutil.flatten<
  $ItemλShape & {
    base: $.PropertyDesc<
      _std.$str,
      $.Cardinality.One,
      false,
      false,
      false,
      false
    >
    '<ascension_gem[is Inventory]': $.LinkDesc<
      $Inventory,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<ascension_gem': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $AscensionGem = $.ObjectType<
  'default::AscensionGem',
  $AscensionGemλShape,
  null
>
const $AscensionGem = $.makeType<$AscensionGem>(
  _.spec,
  '4dac4c8b-f7c2-11ec-a37b-216c54cf79e2',
  _.syntax.literal
)

const AscensionGem: $.$expr_PathNode<
  $.TypeSet<$AscensionGem, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode($.$toSet($AscensionGem, $.Cardinality.Many), null, true)

export type $CharacterλShape = $.typeutil.flatten<
  _std.$Object_906a01bad55611ec888b072cfc45e0d2λShape & {
    name: $.PropertyDesc<
      _std.$str,
      $.Cardinality.One,
      true,
      false,
      false,
      false
    >
    rarity: $.PropertyDesc<
      _std.$int16,
      $.Cardinality.One,
      false,
      false,
      false,
      false
    >
    region: $.PropertyDesc<
      $Region,
      $.Cardinality.AtMostOne,
      false,
      false,
      false,
      false
    >
    vision: $.PropertyDesc<
      $Vision,
      $.Cardinality.One,
      false,
      false,
      false,
      false
    >
    weapon: $.PropertyDesc<
      $Weapon,
      $.Cardinality.One,
      false,
      false,
      false,
      false
    >
    '<characters[is UserCharacter]': $.LinkDesc<
      $UserCharacter,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<characters': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $Character = $.ObjectType<'default::Character', $CharacterλShape, null>
const $Character = $.makeType<$Character>(
  _.spec,
  '4d64cb61-f7c2-11ec-8d2a-25dca81a8ee6',
  _.syntax.literal
)

const Character: $.$expr_PathNode<
  $.TypeSet<$Character, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode($.$toSet($Character, $.Cardinality.Many), null, true)

export type $CommonMaterialλShape = $.typeutil.flatten<
  $ItemλShape & {
    base: $.PropertyDesc<
      _std.$str,
      $.Cardinality.One,
      false,
      false,
      false,
      false
    >
    '<common[is Inventory]': $.LinkDesc<
      $Inventory,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<common': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $CommonMaterial = $.ObjectType<
  'default::CommonMaterial',
  $CommonMaterialλShape,
  null
>
const $CommonMaterial = $.makeType<$CommonMaterial>(
  _.spec,
  '4db3d537-f7c2-11ec-bc22-0f2f0cc52350',
  _.syntax.literal
)

const CommonMaterial: $.$expr_PathNode<
  $.TypeSet<$CommonMaterial, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode(
  $.$toSet($CommonMaterial, $.Cardinality.Many),
  null,
  true
)

export type $InventoryλShape = $.typeutil.flatten<
  _std.$Object_906a01bad55611ec888b072cfc45e0d2λShape & {
    ascension_boss: $.LinkDesc<
      $AscensionBossMaterial,
      $.Cardinality.Many,
      {
        '@quantity': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
      },
      false,
      false,
      false,
      false
    >
    ascension_gem: $.LinkDesc<
      $AscensionGem,
      $.Cardinality.Many,
      {
        '@quantity': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
      },
      false,
      false,
      false,
      false
    >
    common: $.LinkDesc<
      $CommonMaterial,
      $.Cardinality.Many,
      {
        '@quantity': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
      },
      false,
      false,
      false,
      false
    >
    local_specialty: $.LinkDesc<
      $LocalSpecialty,
      $.Cardinality.Many,
      {
        '@quantity': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
      },
      false,
      false,
      false,
      false
    >
    special: $.LinkDesc<
      $SpecialItem,
      $.Cardinality.Many,
      {
        '@quantity': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
      },
      false,
      false,
      false,
      false
    >
    talent_book: $.LinkDesc<
      $TalentBook,
      $.Cardinality.Many,
      {
        '@quantity': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
      },
      false,
      false,
      false,
      false
    >
    talent_boss: $.LinkDesc<
      $TalentBossMaterial,
      $.Cardinality.Many,
      {
        '@quantity': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
      },
      false,
      false,
      false,
      false
    >
    owner: $.LinkDesc<
      $Account,
      $.Cardinality.One,
      {},
      true,
      false,
      false,
      false
    >
    '<inventory[is Account]': $.LinkDesc<
      $Account,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<inventory': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $Inventory = $.ObjectType<'default::Inventory', $InventoryλShape, null>
const $Inventory = $.makeType<$Inventory>(
  _.spec,
  '4dd06785-f7c2-11ec-8e1b-eb07d6e760e0',
  _.syntax.literal
)

const Inventory: $.$expr_PathNode<
  $.TypeSet<$Inventory, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode($.$toSet($Inventory, $.Cardinality.Many), null, true)

export type $LocalSpecialtyλShape = $.typeutil.flatten<
  $ItemλShape & {
    '<local_specialty[is Inventory]': $.LinkDesc<
      $Inventory,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<local_specialty': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $LocalSpecialty = $.ObjectType<
  'default::LocalSpecialty',
  $LocalSpecialtyλShape,
  null
>
const $LocalSpecialty = $.makeType<$LocalSpecialty>(
  _.spec,
  '4db9d252-f7c2-11ec-b431-790853701b99',
  _.syntax.literal
)

const LocalSpecialty: $.$expr_PathNode<
  $.TypeSet<$LocalSpecialty, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode(
  $.$toSet($LocalSpecialty, $.Cardinality.Many),
  null,
  true
)

export type $PasswordλShape = $.typeutil.flatten<
  _std.$Object_906a01bad55611ec888b072cfc45e0d2λShape & {
    hash: $.PropertyDesc<
      _std.$str,
      $.Cardinality.One,
      false,
      false,
      false,
      false
    >
    user: $.LinkDesc<$User, $.Cardinality.One, {}, true, false, false, false>
    '<password[is User]': $.LinkDesc<
      $User,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<password': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $Password = $.ObjectType<'default::Password', $PasswordλShape, null>
const $Password = $.makeType<$Password>(
  _.spec,
  '4defd7bb-f7c2-11ec-aecf-21a49fc311de',
  _.syntax.literal
)

const Password: $.$expr_PathNode<
  $.TypeSet<$Password, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode($.$toSet($Password, $.Cardinality.Many), null, true)

export type $SpecialItemλShape = $.typeutil.flatten<
  $ItemλShape & {
    '<special[is Inventory]': $.LinkDesc<
      $Inventory,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<special': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $SpecialItem = $.ObjectType<
  'default::SpecialItem',
  $SpecialItemλShape,
  null
>
const $SpecialItem = $.makeType<$SpecialItem>(
  _.spec,
  '4dbf3678-f7c2-11ec-916a-058db17cd71b',
  _.syntax.literal
)

const SpecialItem: $.$expr_PathNode<
  $.TypeSet<$SpecialItem, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode($.$toSet($SpecialItem, $.Cardinality.Many), null, true)

export type $TalentBookλShape = $.typeutil.flatten<
  $ItemλShape & {
    base: $.PropertyDesc<
      _std.$str,
      $.Cardinality.One,
      false,
      false,
      false,
      false
    >
    '<talent_book[is Inventory]': $.LinkDesc<
      $Inventory,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<talent_book': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $TalentBook = $.ObjectType<'default::TalentBook', $TalentBookλShape, null>
const $TalentBook = $.makeType<$TalentBook>(
  _.spec,
  '4dc4c039-f7c2-11ec-bc88-bb97bb9ceaa7',
  _.syntax.literal
)

const TalentBook: $.$expr_PathNode<
  $.TypeSet<$TalentBook, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode($.$toSet($TalentBook, $.Cardinality.Many), null, true)

export type $TalentBossMaterialλShape = $.typeutil.flatten<
  $ItemλShape & {
    base: $.PropertyDesc<
      _std.$str,
      $.Cardinality.One,
      false,
      false,
      false,
      false
    >
    '<talent_boss[is Inventory]': $.LinkDesc<
      $Inventory,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<talent_boss': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $TalentBossMaterial = $.ObjectType<
  'default::TalentBossMaterial',
  $TalentBossMaterialλShape,
  null
>
const $TalentBossMaterial = $.makeType<$TalentBossMaterial>(
  _.spec,
  '4dca66cf-f7c2-11ec-b48c-d1bbc98c2269',
  _.syntax.literal
)

const TalentBossMaterial: $.$expr_PathNode<
  $.TypeSet<$TalentBossMaterial, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode(
  $.$toSet($TalentBossMaterial, $.Cardinality.Many),
  null,
  true
)

export type $UserλShape = $.typeutil.flatten<
  _std.$Object_906a01bad55611ec888b072cfc45e0d2λShape & {
    createdAt: $.PropertyDesc<
      _std.$datetime,
      $.Cardinality.One,
      false,
      false,
      false,
      true
    >
    email: $.PropertyDesc<
      _std.$str,
      $.Cardinality.One,
      true,
      false,
      false,
      false
    >
    password: $.LinkDesc<
      $Password,
      $.Cardinality.AtMostOne,
      {},
      false,
      true,
      false,
      false
    >
    accounts: $.LinkDesc<
      $Account,
      $.Cardinality.Many,
      {},
      false,
      true,
      false,
      false
    >
    '<user[is Password]': $.LinkDesc<
      $Password,
      $.Cardinality.AtMostOne,
      {},
      true,
      false,
      false,
      false
    >
    '<owner[is Account]': $.LinkDesc<
      $Account,
      $.Cardinality.AtMostOne,
      {},
      true,
      false,
      false,
      false
    >
    '<owner': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<user': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $User = $.ObjectType<'default::User', $UserλShape, null>
const $User = $.makeType<$User>(
  _.spec,
  '4deb980b-f7c2-11ec-9c21-f30fface895a',
  _.syntax.literal
)

const User: $.$expr_PathNode<
  $.TypeSet<$User, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null, true)

export type $UserCharacterλShape = $.typeutil.flatten<
  _std.$Object_906a01bad55611ec888b072cfc45e0d2λShape & {
    characters: $.LinkDesc<
      $Character,
      $.Cardinality.Many,
      {
        '@elemental_skill': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
        '@normal_attack': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
        '@ascension': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
        '@elemental_burst': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
        '@level': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
      },
      false,
      false,
      false,
      false
    >
    owner: $.LinkDesc<
      $Account,
      $.Cardinality.One,
      {},
      true,
      false,
      false,
      false
    >
    '<characters[is Account]': $.LinkDesc<
      $Account,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
    '<characters': $.LinkDesc<
      $.ObjectType,
      $.Cardinality.Many,
      {},
      false,
      false,
      false,
      false
    >
  }
>
type $UserCharacter = $.ObjectType<
  'default::UserCharacter',
  $UserCharacterλShape,
  null
>
const $UserCharacter = $.makeType<$UserCharacter>(
  _.spec,
  '4d6b1c47-f7c2-11ec-834b-e99f3651abf6',
  _.syntax.literal
)

const UserCharacter: $.$expr_PathNode<
  $.TypeSet<$UserCharacter, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode($.$toSet($UserCharacter, $.Cardinality.Many), null, true)

export {
  $RegionλEnum,
  Region,
  $VisionλEnum,
  Vision,
  $WeaponλEnum,
  Weapon,
  $Account,
  Account,
  $Item,
  Item,
  $AscensionBossMaterial,
  AscensionBossMaterial,
  $AscensionGem,
  AscensionGem,
  $Character,
  Character,
  $CommonMaterial,
  CommonMaterial,
  $Inventory,
  Inventory,
  $LocalSpecialty,
  LocalSpecialty,
  $Password,
  Password,
  $SpecialItem,
  SpecialItem,
  $TalentBook,
  TalentBook,
  $TalentBossMaterial,
  TalentBossMaterial,
  $User,
  User,
  $UserCharacter,
  UserCharacter,
}

type __defaultExports = {
  Region: typeof Region
  Vision: typeof Vision
  Weapon: typeof Weapon
  Account: typeof Account
  Item: typeof Item
  AscensionBossMaterial: typeof AscensionBossMaterial
  AscensionGem: typeof AscensionGem
  Character: typeof Character
  CommonMaterial: typeof CommonMaterial
  Inventory: typeof Inventory
  LocalSpecialty: typeof LocalSpecialty
  Password: typeof Password
  SpecialItem: typeof SpecialItem
  TalentBook: typeof TalentBook
  TalentBossMaterial: typeof TalentBossMaterial
  User: typeof User
  UserCharacter: typeof UserCharacter
}
const __defaultExports: __defaultExports = {
  Region: Region,
  Vision: Vision,
  Weapon: Weapon,
  Account: Account,
  Item: Item,
  AscensionBossMaterial: AscensionBossMaterial,
  AscensionGem: AscensionGem,
  Character: Character,
  CommonMaterial: CommonMaterial,
  Inventory: Inventory,
  LocalSpecialty: LocalSpecialty,
  Password: Password,
  SpecialItem: SpecialItem,
  TalentBook: TalentBook,
  TalentBossMaterial: TalentBossMaterial,
  User: User,
  UserCharacter: UserCharacter,
}
export default __defaultExports
