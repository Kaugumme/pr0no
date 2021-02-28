{
    const //vars
        root = 'https://pr0gramm.com',
        Top = "top",
        New = "new",
        cleanNew = `${root}/${New}/!%20-tiktok`,
        cleanTop = `${root}/${Top}/!%20-tiktok`;
    //custom filter
    const filter = arg => {
        //initial filtering
        if (arg.mode === 1) {
            //coming from new
            if (location.href !== cleanNew && (location.href === `${root}/${New}`)) {
                location.href = cleanNew;
            }
            //coming from top
            if (location.href !== cleanTop && (
                    location.href === `${root}/` || location.href === `${root}/${Top}`)) {
                location.href = cleanTop;

            }
        }
        //push
        if (arg.mode === 2) {
            let go = false;
            switch (arg.url) {
                case `/${New}`: //push to clean top
                    location.href = cleanNew;
                    break;
                case `/${Top}`: //push to clean new
                    location.href = cleanTop;
                    break;
            }
            return go;
        }
    }

    //initial filter
    filter({
        mode: 1
    }); {
        var realPushState = history.pushState;
        history.pushState = function(some, args, I, dunno) {

            if (filter({
                    mode: 2,
                    url: arguments[2]
                })) return void 0;

            //dun touch
            return realPushState.apply(history, arguments); // leave this line exactly as-is.
        };
    }
}
