package back

import (
	"fmt"
	"strconv"
	"strings"
)

type Common struct {}

func (common *Common) GetInSQLString(numbers []int, field string) string {
	var stringIds []string

	for _, id := range numbers {
		stringIds = append(stringIds, strconv.Itoa(id))
	}

	return fmt.Sprintf("`%s` IN (%s)", field, strings.Join(stringIds, ",") )
}
