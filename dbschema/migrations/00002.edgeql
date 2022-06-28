CREATE MIGRATION m1sy6mx7sng6jhutxavf5w6jybrbs2ti56y3li5vofqvahkue6d7rq
    ONTO m174x2kwiz4pq3sumuclj2q4xcpgcs6vmjsuvyc2pjfx6ex4utpbma
{
  ALTER TYPE default::Character {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
