var fortunes = [
	'Рекам нужны истоки.',
	'Не бойся неведомого.',
	'Будь проще везде где это возможно'
]

exports.getFortune = function() {
	var id = Math.floor(Math.random() * fortunes.length);
	return fortunes[id]
}