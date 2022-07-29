package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/andndre/chess-bot/handlers"
	"github.com/bwmarrin/discordgo"
)

func main() {
	s, err := discordgo.New("Bot " + os.Getenv("BOT_TOKEN"))

	if err != nil {
		log.Fatalln("Error creating Discord session,", err)
		return
	}

	err = s.Open()

	if err != nil {
		log.Fatalln("Error when trying to open a websocket to Discord")
	}

	defer s.Close()

	s.AddHandler(handlers.MessageCreate)

	// Wait here until CTRL-C or other term signal is received.
	log.Println("Bot is now running.  Press CTRL-C to exit.")
	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	<-sc
}
