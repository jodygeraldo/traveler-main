CREATE MIGRATION m1hwnngamv3ckcvehgvsmmbhalp6n6pdjrabouvzafna7l7huhelua
    ONTO m1i5pd3li3ca7p3slz467ecg277zk56i4xqct7uuifrq6ujriolfqa
{
  ALTER TYPE default::Inventory {
      ALTER LINK ascension_boss_material {
          RENAME TO ascension_boss;
      };
  };
  ALTER TYPE default::Inventory {
      ALTER LINK common_material {
          RENAME TO common;
      };
  };
  ALTER TYPE default::Inventory {
      ALTER LINK special_items {
          RENAME TO special;
      };
  };
  ALTER TYPE default::Inventory {
      ALTER LINK talent_boss_material {
          RENAME TO talent_boss;
      };
  };
};
