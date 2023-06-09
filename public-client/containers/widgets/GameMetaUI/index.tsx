'use client';

import { v4 as uuidv4 } from 'uuid';
import { FC, useEffect, useState } from 'react';
import { GameMetaModel, Image, Prize, ThemeOption } from '../../../data_models';
import clsx from 'clsx';
import { Button, Form, TextInput, SubHeading } from '../../../components';
import PrizeEditor from './PrizeEditor';
import GameMetaDisplay from './GameMetaDisplay';
import ThemeEditor from '../GameTheme/ThemeEditor';
import { SelectedImage } from '../FileInput/ImageInput';
import { Storage } from '../../../core';
import { themeOptions } from './themeOptions';
import useAuth from '../../../app/AuthProvider';
import { GameEnv } from '@/constants/enums';

interface Props {
  gameMeta: GameMetaModel;
  saveGame: (updatedGame: GameMetaModel) => void;
  loadingCreateGameplay: boolean;
  createNewGamePlay: (
    gameEnv: GameEnv,
    city: string,
    state: string,
    country: string,
    isFullGame: boolean
  ) => void;
}

const GameMetaUI: FC<Props> = ({
  gameMeta,
  saveGame,
  createNewGamePlay,
  loadingCreateGameplay
}) => {
  const { user } = useAuth();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [prizeInputs, setPrizeInputs] = useState<Prize[]>(gameMeta.prizes);
  const [imageInputs, setImageInputs] = useState<{
    logo: SelectedImage | null;
    bgImage: SelectedImage | null;
  }>({
    logo: null,
    bgImage: null
  });
  const [chosenTheme, setChosenTheme] = useState<ThemeOption>(
    gameMeta.theme.pack
  );

  const handleThemeSelection = (option: any) => {
    let ct = themeOptions.find(th => th.value === option.value);
    if (!ct) {
      ct = themeOptions[0];
    }

    setChosenTheme(ct);
  };

  const setEditMode = () => setIsEdit(true);

  const setViewMode = () => {
    setIsEdit(false);
    setChosenTheme(gameMeta.theme.pack);
  };

  const handleImageChange = (
    handleFor: 'logo' | 'bg',
    files: SelectedImage[]
  ) => {
    let newImage = files ? files[0] : null;
    if (newImage === undefined) {
      newImage = null;
    }
    if (handleFor === 'logo') {
      setImageInputs(inps => ({ ...inps, logo: newImage }));
    } else {
      setImageInputs(inps => ({ ...inps, bgImage: newImage }));
    }
  };

  const addNewPrizeRow = () => {
    const newPrize: Prize = {
      id: uuidv4(),
      desc: '',
      item: '',
      quantity: 1,
      winnerPlayerId: {}
    };

    setPrizeInputs([...prizeInputs, newPrize]);
  };

  const deletePrizeRow = (delP: Prize) => {
    const updatedPrizes: Prize[] = [];

    prizeInputs.forEach(p => {
      if (p.id !== delP.id) {
        updatedPrizes.push(p);
      }
    });

    setPrizeInputs(updatedPrizes);
  };

  const updatePrize = (
    value: any,
    key: 'desc' | 'item' | 'quantity',
    prize: Prize
  ) => {
    switch (key) {
      case 'desc':
        prize.desc = value;
        break;

      case 'item':
        prize.item = value;
        break;

      case 'quantity':
        prize.quantity = value;
        break;
    }

    return prize;
  };

  const handleUpdate = (
    value: any,
    id: string,
    key: 'desc' | 'item' | 'quantity'
  ) => {
    setPrizeInputs(prizes => {
      return prizes.map(p => {
        if (p.id === id) {
          return updatePrize(value, key, p);
        }
        return p;
      });
    });
  };

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      title: { value: string };
      tagline: { value: string };
    };
    const title = target.title.value; // typechecks!
    const tagline = target.tagline.value; // typechecks!
    const ct = chosenTheme;

    if (user === null) {
      // TODO - handle error
      return;
    }

    let newLogo: Image | null = null;
    if (imageInputs.logo?.tempData) {
      let res = await Storage.Media.uploadMedia(
        'image',
        imageInputs.logo.tempData.file,
        user.uid,
        'gameLogo',
        gameMeta.uid
      );
      if (res === null) {
        // TODO - handle error
        return;
      }
      newLogo = {
        src: res.downloadUrl,
        alt: 'Logo',
        path: res.storagePath,
        uid: 'GAME_LOGO'
      };
    }

    let newBgImg: Image | null = null;
    if (imageInputs.bgImage?.tempData) {
      let res = await Storage.Media.uploadMedia(
        'image',
        imageInputs.bgImage.tempData.file,
        user.uid,
        'gameBackground',
        gameMeta.uid
      );
      if (res === null) {
        // TODO - handle error
        return;
      }
      newBgImg = {
        src: res.downloadUrl,
        alt: 'Logo',
        path: res.storagePath,
        uid: 'GAME_LOGO'
      };
    }

    const updatedGame: GameMetaModel = {
      ...gameMeta,
      title,
      tagline,
      theme: {
        pack: ct || themeOptions[0],
        logo: newLogo,
        bgImage: newBgImg
      },
      prizes: prizeInputs
    };

    saveGame(updatedGame);
    setViewMode();
  };

  useEffect(() => {
    setViewMode();
    let logoImage: SelectedImage | null = null;
    let bgImage: SelectedImage | null = null;
    if (gameMeta.theme.logo) {
      logoImage = {
        savedImage: {
          src: gameMeta.theme.logo.src,
          alt: gameMeta.theme.logo.alt
        },
        tempData: null
      };
    }

    if (gameMeta.theme.bgImage) {
      bgImage = {
        savedImage: {
          src: gameMeta.theme.bgImage.src,
          alt: gameMeta.theme.bgImage.alt
        },
        tempData: null
      };
    }

    setImageInputs({
      logo: logoImage,
      bgImage: bgImage
    });
  }, [gameMeta && gameMeta.uid]);

  if (gameMeta === null) {
    return <></>;
  }

  if (isEdit === false) {
    return (
      <GameMetaDisplay
        gameMeta={gameMeta}
        setEditMode={setEditMode}
        loadingCreateGameplay={loadingCreateGameplay}
        createNewGamePlay={createNewGamePlay}
      />
    );
  }

  return (
    <Form submitHandlerFunc={onSave}>
      <div className={clsx('grid', 'grid-cols-1', 'gap-4')}>
        <div className='flex justify-between items-start gap-4'>
          <TextInput
            id='title'
            name='title'
            styleClasses='max-w-[300px]'
            label='Game title'
            defaultValue={gameMeta.title}
            placeholder='Breakfast Bingo'
          />
          <div className='flex gap-2'>
            <Button onClick={setViewMode} type='button'>
              cancel
            </Button>
            <Button solid={true} color='accent' type='submit'>
              Save
            </Button>
          </div>
        </div>
        <TextInput
          id='tagline'
          name='tagline'
          label='Tagline'
          defaultValue={gameMeta.tagline}
          placeholder='Sip you drinks and shout out numbers!'
          styleClasses='max-w-md'
        />

        <div className='grid grid-cols-1 xl:grid-cols-5 gap-x-10 gap-y-4'>
          <div className='col-span-2'>
            <ThemeEditor
              chosenTheme={chosenTheme}
              themeOptions={themeOptions}
              selectedImages={imageInputs}
              handleImageChange={handleImageChange}
              handleThemeSelection={handleThemeSelection}
            />
          </div>
          <div className='col-span-3'>
            <SubHeading styleClasses='mb-2'>Prizes</SubHeading>
            <PrizeEditor
              prizes={prizeInputs}
              addNewRow={addNewPrizeRow}
              deleteRow={deletePrizeRow}
              handleUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default GameMetaUI;
