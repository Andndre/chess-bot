package commands

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/andndre/chess-bot/utils"
	"github.com/bwmarrin/discordgo"
)

type GameResponse struct{
	GameId string
	WhiteId string
	BlackId string
	WatchKey string
}

// usage: `[PREFIX] playwith @user`
func PlayWith(s *discordgo.Session, m *discordgo.MessageCreate, player2 *string){

	if m.GuildID == "" {
		s.ChannelMessageSend(m.ChannelID, "This is a guild only command!")
	}

	taggedUser, err := s.User(utils.GetUID(player2))

	if err != nil {
		s.ChannelMessageSend(m.ChannelID, "Cannot get the user")
		return
	}

	// if the tagged user is a bot
	if taggedUser.Bot {
		s.ChannelMessageSend(m.ChannelID, "Cannot play with bot")
		return
	}

	guildMessage, err := s.ChannelMessageSend(m.ChannelID, "Sending game link for each players...")

	if err != nil {
		// nothing we can do
		log.Println("Error when sending message: ", err)
		return
	}

	response, err := http.Get("https://chess-web-production.up.railway.app/create")
	if err != nil {
		s.ChannelMessageEdit(guildMessage.ChannelID, guildMessage.ID, "Failed to create a new game")
		log.Println("Failed to create a new game: " + err.Error())
		return
	}
	defer response.Body.Close()

	body, _ := ioutil.ReadAll(response.Body)
	var gameResponse GameResponse
	json.Unmarshal(body, &gameResponse)

	content := "Here is your game link!.. \n\n**Do not**\n- share it with anybody, or else you will not be able to enter the game.\n- leave the game while playing, or else the game automatically ends.\n\nIf none of you click this link for 3 minutes, the game will be deleted."

	// -- player 1 (as white)
	channel, err := s.UserChannelCreate(m.Author.ID)

	if err != nil {
		log.Println("Error creating channel:", err)
		s.ChannelMessageSend(
			m.ChannelID,
			"Something went wrong while sending the DM!",
		)
		return
	}

	gameLink := "https://chess-web-ten.vercel.app/online?gameId=" + gameResponse.GameId + "&roleKey=";

	_, err = s.ChannelMessageSendComplex(channel.ID, &discordgo.MessageSend{
		Content: content,
		Components: utils.CreateLinkButton("Play", gameLink + gameResponse.WhiteId),
	})

	if err != nil {
		log.Println("error sending DM message:", err)
		s.ChannelMessageSend(
			m.ChannelID,
			"Failed to send you a DM. Did you disable DM in your privacy settings? " + m.Author.Mention(),
		)
		return
	}
	// -- player 2 (as black)
	channel, err = s.UserChannelCreate(m.Author.ID)

	if err != nil {
		log.Println("Error creating channel:", err)
		s.ChannelMessageSend(
			m.ChannelID,
			"Something went wrong while sending the DM!",
		)
		return
	}

	_, err = s.ChannelMessageSendComplex(channel.ID, &discordgo.MessageSend{
		Content: content,
		Components: utils.CreateLinkButton("Play", gameLink + gameResponse.BlackId),
	})

	if err != nil {
		log.Println("error sending DM message:", err)
		s.ChannelMessageSend(
			m.ChannelID,
			"Failed to send you a DM. Did you disable DM in your privacy settings? " + taggedUser.Mention(),
		)
		return
	}

	// -- in guild (watchers)

	guildMessageContent := m.Author.Mention() + " vs " + taggedUser.Mention() + "!"

	guildMessageEdit := discordgo.NewMessageEdit(guildMessage.ChannelID, guildMessage.ID)
	guildMessageEdit.Content = &guildMessageContent
	guildMessageEdit.Components = utils.CreateLinkButton("Go watch!", gameLink + gameResponse.WatchKey)

	_, err = s.ChannelMessageEditComplex(guildMessageEdit)

	if err != nil {
		log.Println("Failed to edit the message: ", err)
		return
	}
}
