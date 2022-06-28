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
    required link inventory -> Inventory { constraint exclusive };
    required link characters -> UserCharacter { constraint exclusive };
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
    multi link special -> SpecialItem {
      property quantity -> int64 { 
        constraint min_value(0);
        default := 0;
      };
    };
    multi link common -> CommonMaterial {
      property quantity -> int64 { 
        constraint min_value(0);
        default := 0;
      };
    };
    multi link ascension_gem -> AscensionGem {
      property quantity -> int64 { 
        constraint min_value(0);
        default := 0;
      };
    };
    multi link ascension_boss -> AscensionBossMaterial {
      property quantity -> int64 { 
        constraint min_value(0);
        default := 0;
      };
    };
    multi link local_specialty -> LocalSpecialty {
      property quantity -> int64 { 
        constraint min_value(0);
        default := 0;
      };
    };
    multi link talent_book -> TalentBook {
      property quantity -> int64 { 
        constraint min_value(0);
        default := 0;
      };
    };
    multi link talent_boss -> TalentBossMaterial {
      property quantity -> int64 { 
        constraint min_value(0);
        default := 0;
      };
    };

    link owner := .<inventory[is Account];
  }

  scalar type Region extending enum<Mondstadt, Liyue, Inazuma, Sumeru, Fontaine, Natlan, Snezhnaya>;
  scalar type Vision extending enum<Anemo, Cryo, Dendro, Electro, Geo, Hydro, Pyro>;
  scalar type Weapon extending enum<Bow, Catalyst, Claymore, Polearm, Sword>;

  type Character {
    required property name -> str { constraint exclusive };
    property region -> Region;
    required property vision -> Vision;
    required property weapon -> Weapon;
    required property rarity -> int16 {
      constraint min_value(4);
      constraint max_value(5);
    };
  }

  type UserCharacter {
    multi link characters -> Character {
      property level -> int16 {
        constraint min_value(1);
        constraint max_value(90);
        default := 1;
      };
      property asecension -> int16 {
        constraint min_value(0);
        constraint max_value(6);
        default := 0;
      };
      property normal_attack -> int16 {
        constraint min_value(1);
        constraint max_value(10);
        default := 1;
      };
      property elemental_skill -> int16 {
        constraint min_value(1);
        constraint max_value(10);
        default := 1;
      };
      property elemental_burst -> int16 {
        constraint min_value(1);
        constraint max_value(10);
        default := 1;
      };
      property tracked -> bool {
        default := true;
      };
    };

    link owner := .<characters[is Account];
  }
}
