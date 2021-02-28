{
    const //script vars
        root = 'https://pr0gramm.com',
        Top = "top",
        New = "new",
        cleanNew = `${root}/${New}/!%20-tiktok`,
        cleanTop = `${root}/${Top}/!%20-tiktok`;
    //custom filter method
    const filter = arg => {
        //initial filter mode
        if (arg.mode === 1) {
            //coming from new
            if (location.href !== cleanNew && (location.href === `${root}/${New}`)) {
                location.href = cleanNew;
            }
            //coming from initial (root) or top
            if (location.href !== cleanTop && (
                    location.href === `${root}/` || location.href === `${root}/${Top}`)) {
                location.href = cleanTop;

            }
        }
        //push filter mode
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

    //filter initial call
    filter({
        mode: 1
    }); { //catch push crap
        var realPushState = history.pushState;
        history.pushState = function() {

            if (filter({ //ignore unfiltered pushies
                    mode: 2,
                    url: arguments[2]
                })) return void 0;
            //dun touch ( apply original push url)
            return realPushState.apply(history, arguments);
        };
    }
}
