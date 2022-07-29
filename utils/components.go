package utils

import "github.com/bwmarrin/discordgo"

func CreateLinkButton(label string, link string) []discordgo.MessageComponent {
	return []discordgo.MessageComponent{
			discordgo.ActionsRow{
				Components: []discordgo.MessageComponent{
					discordgo.Button{
						Label: label,
						Style: discordgo.LinkButton,
						URL:   link,
					},
				},
			},
		}
}