CREATE MIGRATION m17oy47zsv6idallf2pqhweyqey6vs5ypolxvduxh2ajwai7ufmbka
    ONTO m1mhsc2fdfeednadwysrp2pnvcbtnw3wlaomqt6plsfxlyjzcdabgq
{
  ALTER TYPE default::Item {
      ALTER PROPERTY rarity {
          DROP CONSTRAINT std::max_len_value(5);
      };
  };
  ALTER TYPE default::Item {
      ALTER PROPERTY rarity {
          CREATE CONSTRAINT std::max_value(5);
      };
  };
  ALTER TYPE default::Item {
      ALTER PROPERTY rarity {
          DROP CONSTRAINT std::min_len_value(1);
      };
  };
  ALTER TYPE default::Item {
      ALTER PROPERTY rarity {
          CREATE CONSTRAINT std::min_value(1);
      };
  };
  ALTER TYPE default::Character {
      ALTER PROPERTY rarity {
          DROP CONSTRAINT std::max_len_value(5);
      };
  };
  ALTER TYPE default::Character {
      ALTER PROPERTY rarity {
          CREATE CONSTRAINT std::max_value(5);
      };
  };
  ALTER TYPE default::Character {
      ALTER PROPERTY rarity {
          DROP CONSTRAINT std::min_len_value(4);
      };
  };
  ALTER TYPE default::Character {
      ALTER PROPERTY rarity {
          CREATE CONSTRAINT std::min_value(4);
      };
  };
};
