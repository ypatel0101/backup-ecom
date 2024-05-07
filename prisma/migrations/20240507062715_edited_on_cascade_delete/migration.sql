-- DropForeignKey
ALTER TABLE "cart_games" DROP CONSTRAINT "cart_games_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_games" DROP CONSTRAINT "cart_games_game_id_fkey";

-- AddForeignKey
ALTER TABLE "cart_games" ADD CONSTRAINT "cart_games_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_games" ADD CONSTRAINT "cart_games_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
