CREATE MIGRATION m174x2kwiz4pq3sumuclj2q4xcpgcs6vmjsuvyc2pjfx6ex4utpbma
    ONTO initial
{
  CREATE ABSTRACT TYPE default::Item {
      CREATE REQUIRED PROPERTY name -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY rarity -> std::int16 {
          CREATE CONSTRAINT std::max_value(5);
          CREATE CONSTRAINT std::min_value(1);
      };
  };
  CREATE TYPE default::AscensionBossMaterial EXTENDING default::Item;
  CREATE TYPE default::AscensionGem EXTENDING default::Item {
      CREATE REQUIRED PROPERTY base -> std::str;
  };
  CREATE TYPE default::CommonMaterial EXTENDING default::Item {
      CREATE REQUIRED PROPERTY base -> std::str;
  };
  CREATE TYPE default::LocalSpecialty EXTENDING default::Item;
  CREATE TYPE default::SpecialItem EXTENDING default::Item;
  CREATE TYPE default::TalentBook EXTENDING default::Item {
      CREATE REQUIRED PROPERTY base -> std::str;
  };
  CREATE TYPE default::TalentBossMaterial EXTENDING default::Item {
      CREATE REQUIRED PROPERTY base -> std::str;
  };
  CREATE TYPE default::Inventory {
      CREATE MULTI LINK ascension_boss_material -> default::AscensionBossMaterial {
          CREATE PROPERTY quantity -> std::int16 {
              SET default := 0;
          };
      };
      CREATE MULTI LINK ascension_gem -> default::AscensionGem {
          CREATE PROPERTY quantity -> std::int16 {
              SET default := 0;
          };
      };
      CREATE MULTI LINK common_material -> default::CommonMaterial {
          CREATE PROPERTY quantity -> std::int16 {
              SET default := 0;
          };
      };
      CREATE MULTI LINK local_specialty -> default::LocalSpecialty {
          CREATE PROPERTY quantity -> std::int16 {
              SET default := 0;
          };
      };
      CREATE MULTI LINK special_items -> default::SpecialItem {
          CREATE PROPERTY quantity -> std::int16 {
              SET default := 0;
          };
      };
      CREATE MULTI LINK talent_book -> default::TalentBook {
          CREATE PROPERTY quantity -> std::int16 {
              SET default := 0;
          };
      };
      CREATE MULTI LINK talent_boss_material -> default::TalentBossMaterial {
          CREATE PROPERTY quantity -> std::int16 {
              SET default := 0;
          };
      };
  };
  CREATE SCALAR TYPE default::Region EXTENDING enum<Mondstadt, Liyue, Inazuma, Sumeru, Fontaine, Natlan, Snezhnaya>;
  CREATE SCALAR TYPE default::Vision EXTENDING enum<Anemo, Cryo, Dendro, Electro, Geo, Hydro, Pyro>;
  CREATE SCALAR TYPE default::Weapon EXTENDING enum<Bow, Catalyst, Claymore, Polearm, Sword>;
  CREATE TYPE default::Character {
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY rarity -> std::int16 {
          CREATE CONSTRAINT std::max_value(5);
          CREATE CONSTRAINT std::min_value(4);
      };
      CREATE PROPERTY region -> default::Region;
      CREATE REQUIRED PROPERTY vision -> default::Vision;
      CREATE REQUIRED PROPERTY weapon -> default::Weapon;
  };
  CREATE TYPE default::UserCharacter {
      CREATE MULTI LINK characters -> default::Character {
          CREATE PROPERTY asecension -> std::int16 {
              SET default := 0;
          };
          CREATE PROPERTY elemental_burst -> std::int16 {
              SET default := 1;
          };
          CREATE PROPERTY elemental_skill -> std::int16 {
              SET default := 1;
          };
          CREATE PROPERTY level -> std::int16 {
              SET default := 1;
          };
          CREATE PROPERTY normal_attack -> std::int16 {
              SET default := 1;
          };
          CREATE PROPERTY tracked -> std::bool {
              SET default := true;
          };
      };
  };
  CREATE TYPE default::Account {
      CREATE REQUIRED LINK characters -> default::UserCharacter {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED LINK inventory -> default::Inventory {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY name -> std::str {
          SET default := 'Default';
      };
  };
  CREATE TYPE default::User {
      CREATE REQUIRED MULTI LINK account -> default::Account {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY createdAt -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY email -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE default::Password {
      CREATE REQUIRED LINK user -> default::User {
          ON TARGET DELETE  DELETE SOURCE;
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY hash -> std::str;
  };
  ALTER TYPE default::User {
      CREATE LINK password := (.<user[IS default::Password]);
  };
};
