module default {
  type User {
    required property email -> str { constraint exclusive };
    required property createdAt -> datetime { default := datetime_current() };
    link password := .<user[is Password];
    required multi link account -> Account { constraint exclusive };
  }

  type Password {
    required property hash -> str;
    required link user -> User {
      constraint exclusive;
      on target delete delete source;
    }
  }

  type Account {
    required property name -> str { default := "Default" };
    multi link inventory := .<owner[is Inventory];
    multi link characters := .<owner[is UserCharacter];
  }

  abstract type Item {
    required property name -> str { constraint exclusive };
    required property rarity -> int16 { 
      constraint min_value(1);
      constraint max_value(5);
    };
  }

  type SpecialItem extending Item;

  type CommonMaterial extending Item {
    required property base -> str;
  }

  type AscensionGem extending Item {
    required property base -> str;
  }

  type AscensionBossMaterial extending Item;

  type LocalSpecialty extending Item;

  type TalentBook extending Item {
    required property base -> str;
  }

  type TalentBossMaterial extending Item {
    required property base -> str;
  }

  type Inventory {
    required link owner -> Account {
      constraint exclusive;
      on target delete delete source;
    };

    multi link special_items -> SpecialItem {
      property quantity -> int16 { default := 0 };
    };
    multi link common_material -> CommonMaterial {
      property quantity -> int16 { default := 0 };
    };
    multi link ascension_gem -> AscensionGem {
      property quantity -> int16 { default := 0 };
    };
    multi link ascension_boss_material -> AscensionBossMaterial {
      property quantity -> int16 { default := 0 };
    };
    multi link local_specialty -> LocalSpecialty {
      property quantity -> int16 { default := 0 };
    };
    multi link talent_book -> TalentBook {
      property quantity -> int16 { default := 0 };
    };
    multi link talent_boss_material -> TalentBossMaterial {
      property quantity -> int16 { default := 0 };
    };
  }

  scalar type Region extending enum<Mondstadt, Liyue, Inazuma, Sumeru, Fontaine, Natlan, Snezhnaya>;
  scalar type Vision extending enum<Anemo, Cryo, Dendro, Electro, Geo, Hydro, Pyro>;
  scalar type Weapon extending enum<Bow, Catalyst, Claymore, Polearm, Sword>;

  type Character {
    required property name -> str;
    property region -> Region;
    required property vision -> Vision;
    required property weapon -> Weapon;
    required property rarity -> int16 {
      constraint min_value(4);
      constraint max_value(5);
    };
  }

  type UserCharacter {
    required link owner -> Account {
      constraint exclusive;
      on target delete delete source;
    };
    multi link characters -> Character {
      property level -> int16 { default := 1 };
      property asecension -> int16 { default := 0 };
      property normal_attack -> int16 { default := 1 };
      property elemental_skill -> int16 { default := 1 };
      property elemental_burst -> int16 { default := 1 };
      property tracked -> bool { default := true };
    };
  }
}
