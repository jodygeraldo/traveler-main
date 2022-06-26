CREATE MIGRATION m1mhsc2fdfeednadwysrp2pnvcbtnw3wlaomqt6plsfxlyjzcdabgq
    ONTO m1n2wybadv7fh3itllvuhjdb7qgt5zktnvno24uigjax6qdyuapypa
{
  ALTER TYPE default::Character {
      ALTER PROPERTY region {
          RESET OPTIONALITY;
      };
  };
};
