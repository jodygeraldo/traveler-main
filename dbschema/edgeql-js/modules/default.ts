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
  'f7e642d8-fe8d-11ec-b686-cbfc473dfe3d',
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
  'f7e65b41-fe8d-11ec-b6e0-b906df75d8f1',
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
  'f7e66d17-fe8d-11ec-a269-49ef3643b7e5',
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
  'f7e4259a-fe8d-11ec-8948-075276d8bf75',
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
  'f7ffa6a6-fe8d-11ec-9afd-074c6ea30010',
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
  'f804598d-fe8d-11ec-a7b1-45b61d701f61',
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
  'f8092772-fe8d-11ec-8286-87376f732cd2',
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
  'f7e68122-fe8d-11ec-8fc2-9f5d51f61590',
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
  'f80e5509-fe8d-11ec-8cea-0d5118b267e8',
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
  'f836b2c9-fe8d-11ec-88a4-6fe52f9846e8',
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
  'f8133e3b-fe8d-11ec-b480-23b499bf2997',
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
    user: $.LinkDesc<$User, $.Cardinality.One, {}, true, false, false, false>
    hash: $.PropertyDesc<
      _std.$str,
      $.Cardinality.One,
      false,
      false,
      false,
      false
    >
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
  'f8513d1d-fe8d-11ec-8a08-e73b6d120f87',
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
  'f822cf33-fe8d-11ec-b457-bbccd8d91510',
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
  'f827e784-fe8d-11ec-8e80-998ce23faddf',
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
  'f8302c8e-fe8d-11ec-ae15-83036530ae8a',
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
  'f84d816a-fe8d-11ec-ad85-873871730a86',
  _.syntax.literal
)

const User: $.$expr_PathNode<
  $.TypeSet<$User, $.Cardinality.Many>,
  null,
  true
> = _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null, true)

export type $UserCharacterλShape = $.typeutil.flatten<
  _std.$Object_906a01bad55611ec888b072cfc45e0d2λShape & {
    owner: $.LinkDesc<
      $Account,
      $.Cardinality.One,
      {},
      true,
      false,
      false,
      false
    >
    characters: $.LinkDesc<
      $Character,
      $.Cardinality.Many,
      {
        '@ascension': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
        '@normal_attack': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
        '@level': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
        '@elemental_skill': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
        '@elemental_burst': $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne>
      },
      false,
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
  'f7ec18e4-fe8d-11ec-ac7d-21454d343367',
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
