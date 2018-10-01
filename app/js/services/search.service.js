app.service('searchJson', function ($window, _, $sce) {
    var exclude = ['the', 'a', 'an', 'another', 'the', 'an', 'some', 'any', 'my', 'our', 'their', 'her', 'his', 'it', 'another', 'each', 'every', 'certain', 'its', 'another', 'no', 'this', 'that', 'of', 'out', 'to', 'i', 'with', 'by', 'as', 'far', 'into', 'out']
    this.search = function (searchString, data) {
        var data = data || {};
        var catalogue = data.data;
        return filterCatalogueByItemName(catalogue, searchString);
    }
    this.results = ''

    function filterCatalogueByItemName(catalogue, itemName) {
        var str = itemName;
        var words = str.split(" ");
        for (var i = 0; i < words.length - 1; i++) {

            words[i] += " ";

        }
        words = trimWords(words)
        words = lowerPatternCase(words)
        words = removeSingleLetter(words)
        if (words.length > 0) {
            for (i = 0; i < words.length; i++) {
                var loweredSearchString = _.toLower(words[i]);
                var filteredTitles = _.filter(catalogue, function (item) {
                    return _.includes(_.toLower(item.name), loweredSearchString);
                });
                var filteredDescription = _.filter(catalogue, function (item) {
                    return _.includes(_.toLower(item.about), loweredSearchString);
                });

            }
            var combined = _.concat(filteredTitles, filteredDescription);
            var unique = _.uniqBy(combined, function (e) {
                return e.loID;
            });

            unique = countWordsInItem(words, unique)
            var result = splitSortTitles(unique)
            var final = highlightString(result, words)
            return {
                data: final
            }
        } else {
            return {
                data: []
            }
        }
    }

    function lowerPatternCase(words) {
        var lowercase = [];
        _.forEach(words, function (word) {
            word = word.toLowerCase()
            lowercase.push(word)
        })
        return lowercase;
    }



    function splitSortTitles(arr) {
        var temp = []

        _.forEach(arr, function (item) {
            if (item.titleArr.indexOf(false) == -1) {
                temp.push(item)
            }
        })
        var result = []
        var sort = _.sortBy(arr, 'count');
        var titles = _.sortBy(temp, 'count');
        _.forEachRight(sort, function (value) {
            result.push(value);
        });
        var combined = _.concat(titles, result);
        var unique = _.uniqBy(combined, function (e) {
            return e.loID;
        });
        return unique;
    }

    function countWordsInItem(words, items) {
        var arr = _.map(items, function (element) {
            return _.extend({}, element, {
                count: 0,
                titleArr: []
            });
        });
        items = arr
        for (var i = 0; i < words.length; i++) {
            var count = 0;
            var titleArr = []
            var word = words[i].trim()
            for (var j = 0; j < items.length; j++) {
                var regex = new RegExp(word, 'g');
                var title = _.toLower(items[j].name);

                count += (title.match(regex) || []).length
                if (title.search(word) != -1) {}
                if (count > 0 || title.search(word) != -1 || items[j].matched == true) {
                    items[j].titleArr.push(true);
                } else {
                    items[j].titleArr.push(false);
                }
                items[j].count = count;
                count = 0;
            }
        }
        return items
    }

    function removeSingleLetter(arr) {
        var temp = []
        for (var i = 0; i < arr.length; i++) {
            if ((arr[i].length > 1) && exclude.indexOf(arr[i]) == -1) {
                temp.push(arr[i])
            }
        }
        return temp
    }

    function trimWords(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].trim()
        }
        return arr
    }

    function highlightString(items, words) {
        _.forEach(items, function (item) {
            var str = item.name;
            console.log(words)
            for (var i = 0; i < words.length; i++) {
                var pattern = (words[i].trim()).toLowerCase()

                str = item.name;
                var reg = new RegExp("(\\b(?!class=)\w*" + pattern + "\w*)", "gi"); //match pattern ignore class=
                str = str.replace(reg, '<span class="highlight">$1</span>')

                item.name = str

            }

        })
        return items
    }

})
