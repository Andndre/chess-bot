package utils

// Get xxxxxxxxx from <@xxxxxxxxx>
func GetUID(tag *string) string {
	return (*tag)[2 : len(*tag)-1]
}