package handlers

import (
	"strings"

	"github.com/andndre/chess-bot/commands"
	"github.com/bwmarrin/discordgo"
)

func MessageCreate(s *discordgo.Session, m * discordgo.MessageCreate) {

	const PREFIX = "chdev"

	// Ignore all messages created by the bot itself
	if m.Author.ID == s.State.User.ID {
		return
	}

	if !strings.HasPrefix(m.Content, PREFIX) {
		return
	}

	// Allow space after prefix (eg. `ch ping` and `chping`)
	afterPrefix := strings.Trim(m.Content[len(PREFIX):len(m.Content)], " ")
	afterPrefixWords := strings.Split(afterPrefix, " ")

	switch strings.ToLower(afterPrefixWords[0]) {
	case "ping":
		if len(afterPrefixWords) != 1 {
			s.ChannelMessageSend(m.ChannelID, "Invalid command!")
			return
		}
		commands.Ping(s, m)
	case "playwith":
		if len(afterPrefixWords) != 2 {
			s.ChannelMessageSend(m.ChannelID, "Invalid command!")
			return
		}
		player2 := afterPrefixWords[1]
		commands.PlayWith(s, m, &player2)
	}
}
