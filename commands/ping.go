package commands

import (
	"log"
	"strconv"
	"time"

	"github.com/bwmarrin/discordgo"
)

// usage: `[PREFIX] ping`
func Ping(s *discordgo.Session, m * discordgo.MessageCreate){
	start := time.Now().UnixNano()

	message, err := s.ChannelMessageSend(m.ChannelID, "...")

	if err != nil {
		log.Println("Cannot send message: ", err)
	}

	end := time.Now().UnixNano()

	botLatency := strconv.Itoa(int((end - start) / int64(time.Millisecond)))

	s.ChannelMessageEdit(message.ChannelID, message.ID, "Pong!\n" + botLatency + "ms")
}
