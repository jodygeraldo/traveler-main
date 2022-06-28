CREATE MIGRATION m17j5slzvmgewumtrgjym7sfzyidcqkvqicykhufyeayqo5i67ohma
    ONTO m1nau5x7k6zv4bmbuecl5hd2gvkyco5bmd5zmo6nrbwmqgmesidbra
{
  ALTER TYPE default::Inventory {
      ALTER LINK ascension_boss_material {
          ALTER PROPERTY quantity {
              CREATE CONSTRAINT std::min_value(0);
          };
      };
      ALTER LINK ascension_gem {
          ALTER PROPERTY quantity {
              CREATE CONSTRAINT std::min_value(0);
          };
      };
      ALTER LINK common_material {
          ALTER PROPERTY quantity {
              CREATE CONSTRAINT std::min_value(0);
          };
      };
      ALTER LINK local_specialty {
          ALTER PROPERTY quantity {
              CREATE CONSTRAINT std::min_value(0);
          };
      };
      ALTER LINK special_items {
          ALTER PROPERTY quantity {
              CREATE CONSTRAINT std::min_value(0);
          };
      };
      ALTER LINK talent_book {
          ALTER PROPERTY quantity {
              CREATE CONSTRAINT std::min_value(0);
          };
      };
      ALTER LINK talent_boss_material {
          ALTER PROPERTY quantity {
              CREATE CONSTRAINT std::min_value(0);
          };
      };
  };
};
