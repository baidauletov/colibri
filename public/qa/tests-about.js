suite('About page tests', function(){
	test('page must have link contact page', function(){
		//$('a[href="./contact"]')
		assert(document.querySelector('a[href="./contact"]') !== null);
	});
})