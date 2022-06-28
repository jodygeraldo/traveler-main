CREATE MIGRATION m1nau5x7k6zv4bmbuecl5hd2gvkyco5bmd5zmo6nrbwmqgmesidbra
    ONTO m1sy6mx7sng6jhutxavf5w6jybrbs2ti56y3li5vofqvahkue6d7rq
{
  ALTER TYPE default::Inventory {
      CREATE LINK owner := (.<inventory[IS default::Account]);
  };
  ALTER TYPE default::UserCharacter {
      CREATE LINK owner := (.<characters[IS default::Account]);
  };
};
