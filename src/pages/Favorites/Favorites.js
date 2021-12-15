import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";
import { useFavorites } from "Contexts/FavoritesContext";
import Button from '../../components/Button'
import * as C from "constant";

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();

  const handleClearClick = () => {
    clearFavorites();
  }

  return (
    <S.Content>
      <S.Header>
        <Text size="64px" bold>
        Favorites
        </Text>
      </S.Header>
        <Button label={'Clear Favorites'} color={C.COLORS.secondary} variant={C.VARIANT.outlined} onClick={handleClearClick}/>
        <br/>
        <UserList users={favorites} isLoading={false} />
    </S.Content>
  );
};

export default Favorites;
