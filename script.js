{
    const //vars
        root = 'https://pr0gramm.com'
    cleanNew = `${root}/new/!%20-tiktok`,
        cleanTop = `${root}/top/!%20-tiktok`
    //custom filter
    const filter = mode => {
        //initial filtering
        if (mode === 1) {
            //coming from new
            if (location.href !== cleanNew && (location.href === `${root}/new`)) {
                location.href = cleanNew;
            }
            //coming from top
            if (location.href !== cleanTop && (
                    location.href === `${root}/` || location.href === `${root}/top`)) {
                location.href = cleanTop;
                
            }
        }
        //push
        if (mode === 2) {

			//push to clean top
			if (location.href.startsWith(`${root}/new`)) {
                location.href = cleanTop;
            }
            //push to clean new
            if (location.href.startsWith(`${root}/top`)) {
                location.href = cleanNew;
            }
        }
    }

    //initial filter
    filter(1); {
        var realPushState = history.pushState;
        history.pushState = function(some, args, I, dunno) {

            if (filter(2)) return void 0;

            //dun touch
            return realPushState.apply(history, arguments); // leave this line exactly as-is.
        };
    }
}
