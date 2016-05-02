angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    Parse.serverURL = "http://brainproject.herokuapp.com/parse";
    Parse.initialize("hfjeuiry7oj23hlwer4");
    getUser();
})

.controller('BrainsCtrl', function ($scope) {
    var load = true;

    $scope.loading = (function loading() {
        return load;
    });

    runQuery();

    function runQuery() {
        var query = new Parse.Query(Parse.Object.extend("Brains"));
        query.ascending("name");
        query.find({
            success: function (results) {
                var brains = [];
                for (var i = 0; i < results.length; i++) {
                    brains.push({
                        id: results[i].id,
                        title: results[i].get("name"),
                        desc: results[i].get("desc"),
                        img1: results[i].get("img1"),
                        img2: results[i].get("img2"),
                        img3: results[i].get("img3"),
                        icon: results[i].get("icon")
                    });
                }
                load = false;
                $scope.brains = brains;
                $scope.$apply();
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
                load = false;
                $scope.$apply();
            }
        });
    }
})

.controller('BrainCtrl', function ($scope, $stateParams) {
    var brain = JSON.parse($stateParams.brain);
    $scope.title = brain.title;
    $scope.desc = brain.desc;
    $scope.img1 = "http://i.imgur.com/" + brain.img1 + ".jpg";
    $scope.img2 = "http://i.imgur.com/" + brain.img2 + ".jpg";
    $scope.img3 = "http://i.imgur.com/" + brain.img3 + ".jpg";
})

.controller('ArtistsCtrl', function ($scope) {
    var load = true;

    $scope.loading = (function loading() {
        return load;
    });

    runQuery();

    function runQuery() {
        var query = new Parse.Query(Parse.Object.extend("Artists"));
        query.ascending("name");
        query.find({
            success: function (results) {
                var artists = [];
                for (var i = 0; i < results.length; i++) {
                    artists.push({
                        id: results[i].id,
                        name: results[i].get("name")
                    });
                }
                $scope.artists = artists;
                load = false;
                visibility = true;
                $scope.$apply();
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
                load = false;
                $scope.$apply();
            }
        });
    }
})

.controller('ArtistCtrl', function ($scope, $stateParams) {
    var artist = JSON.parse($stateParams.artist);
    $scope.title = artist.name;
})

.controller('BrainQuizCtrl', function ($scope) {
    $scope.visibility = "visible";

    runQuery();

    function runQuery() {
        var query = new Parse.Query(Parse.Object.extend("Quiz"));
        query.find({
            success: function (results) {
                var questions = [];
                for (var i = 0; i < results.length; i++) {
                    questions.push({
                        id: results[i].id,
                        question: results[i].get("question"),
                        answer: results[i].get("answer"),
                        option1: results[i].get("option1"),
                        option2: results[i].get("option2"),
                        option3: results[i].get("option3"),
                        option4: results[i].get("option4")
                    });
                }
                $scope.visibility = "hidden";
                $scope.questions = JSON.stringify(questions);
                $scope.$apply();
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
})

.controller('BrainQuizPlayCtrl', function ($scope, $stateParams) {
    var quizParams = JSON.parse($stateParams.questions);
    var questionVisible = true;
    var answerVisible = false;
    var resultsVisible = false;
    var showresults = false;
    var currentQuestion = 0;
    var correct = 0;
    var incorrect = 0;
    var questions = [];
    var results = [];
    $scope.showhideresults = "SHOW RESULTS";

    for (var i = 0; i < quizParams.length; i++) {
        questions.push(quizParams[i]);
    }

    $scope.question = questions[currentQuestion].question;
    $scope.option1 = questions[currentQuestion].option1;
    $scope.option2 = questions[currentQuestion].option2;
    $scope.option3 = questions[currentQuestion].option3;
    $scope.option4 = questions[currentQuestion].option4;

    $scope.nextQuestion = (function nextQuestion(option) {
        var color = "";
        if (questions[currentQuestion].answer == option) {
            correct++;
            color = "rgba(0, 102, 0, 0.3)";
        } else {
            incorrect++;
            color = "rgba(255, 0, 0, 0.3)";
        }
        results.push({ yourAnswer: option, correctAnswer: questions[currentQuestion].answer, color: color });
        if (currentQuestion + 1 < questions.length) {
            questionVisible = false;
            answerVisible = true;
            $scope.yourAnswer = option;
            $scope.correctAnswer = questions[currentQuestion].answer;
            $scope.question = questions[++currentQuestion].question;
            $scope.option1 = questions[currentQuestion].option1;
            $scope.option2 = questions[currentQuestion].option2;
            $scope.option3 = questions[currentQuestion].option3;
            $scope.option4 = questions[currentQuestion].option4;
        } else {
            $scope.results = results;
            $scope.correct = correct;
            $scope.incorrect = incorrect;
            resultsVisible = true;
            questionVisible = false;
            answerVisible = false;
        }
    });

    $scope.showQuestion = (function showQuestion() {
        return questionVisible;
    });

    $scope.showAnswer = (function showAnswer() {
        return answerVisible;
    });

    $scope.dismissResults = (function dismissResults() {
        questionVisible = true;
        answerVisible = false;
    });

    $scope.showResults = (function showResults() {
        return resultsVisible;
    });

    $scope.showOrHideResults = (function showOrHideResults() {
        showresults = !showresults;
        if (showresults) {
            $scope.showhideresults = "HIDE RESULTS";
        } else {
            $scope.showhideresults = "SHOW RESULTS";
        }
    });

    $scope.showResultsList = (function showResultsList() {
        return showresults;
    });

    $scope.shareViaTwitter = (function shareViaTwitter() {
        window.plugins.socialsharing.shareViaTwitter('I took the Brain Project Quiz and got ' + correct + ' answers correct! Check it out! #jbtbrains', null, 'http://www.jbtbrains.org');
    });

    $scope.shareViaFacebook = (function shareViaFacebook() {
        window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint('I took the Brain Project Quiz and got ' + correct + ' answers correct! #jbtbrains', null, 'http://www.jbtbrains.org');
    });
})

.controller('BrainGameCtrl', function ($scope) {
    var showdetect = true;
    var showload = false;
    var showmenu = false;
    var beacons = [];

    estimote.beacons.requestWhenInUseAuthorization();

    estimote.beacons.startRangingBeaconsInRegion({}, onRangingSuccess, onRangingError);

    function onRangingSuccess(beaconInfo) {
        beacons = beaconInfo.beacons.sort(function (beacon1, beacon2) {
            return beacon1.distance > beacon2.distance
        });
    }

    function onRangingError(errorMessage) {
        alert(errorMessage);
    }

    $scope.detect = (function detect() {
        if (beacons.length > 0) {
            runQuery(beacons[0].major.toString(), beacons[0].minor.toString());
        } else {
            $scope.brainName = "No brain detected!";
            showload = false;
            showdetect = false;
            showmenu = true;
        }
    });

    $scope.refresh = (function refresh() {
        showmenu = false;
        showdetect = true;
    });

    $scope.showDetect = (function showDetect() {
        return showdetect;
    });

    $scope.showMenu = (function showMenu() {
        return showmenu;
    });

    $scope.showLoad = (function showLoad() {
        return showload;
    });

    function runQuery(major, minor) {
        showload = true;
        var query = new Parse.Query(Parse.Object.extend("iBeacons"));
        query.equalTo("major", major);
        query.equalTo("minor", minor);
        query.first({
            success: function (object) {
                if (object != null) {
                    $scope.brainName = object.get("name").toUpperCase();
                } else {
                    $scope.brainName = "No brain detected!";
                }
                queryComplete();
            },
            error: function (error) {
                $scope.brainName = "No brain detected!";
                alert("Error: " + error.code + " " + error.message);
                queryComplete();
            }
        });
    }

    function queryComplete() {
        showdetect = false;
        showmenu = true;
        showload = false;
    }

    $scope.patterns = (function patterns() {
        window.location.href = '#/app/patterns' + Parse.User.current().get("Patterns");
    })

    $scope.cognition = (function cognition() {
        window.location.href = '#/app/cognition' + Parse.User.current().get("Cognition");
    })

    $scope.reflex = (function reflex() {
        window.location.href = '#/app/reflex' + Parse.User.current().get("Reflex");
    })

    $scope.memory = (function memory() {
        window.location.href = '#/app/memory' + Parse.User.current().get("Memory");
    })
})

.controller('AccountCtrl', function ($scope) {
    var load = false;

    $scope.loading = (function loading() {
        return load;
    });

    $scope.resetAccount = (function resetAccount() {
        load = true;
        Parse.User.current().set("username", device.uuid);
        Parse.User.current().set("password", device.uuid);
        Parse.User.current().set("email", device.uuid + "@email.com");
        Parse.User.current().set("Patterns", 0);
        Parse.User.current().set("Cognition", 0);
        Parse.User.current().set("Reflex", 0);
        Parse.User.current().set("Memory", 0);
        Parse.User.current().save(null, {
            success: function (user) {
                load = false;
                $scope.$apply();
            },
            error: function (error) {
                alert(error.message);
                load = false;
                $scope.$apply();
            }
        })
    });
})

/**PATTERNS*/

.controller('Patterns0Ctrl', function ($scope) {
    var showinstructions = true;
    var showgame = false;
    var showresults = false;
    var nums = [];
    var load = false;

    $scope.loading = (function loading() {
        return load;
    });
    
    $scope.countdown = 10;
    var timer = setInterval(function () {
        if(showgame){
            $scope.countdown--;
        }
        if ($scope.countdown == 0) {
            showinstructions = false;
            showgame = false;
            showresults = true;
            showAnswer(0);
        }
        $scope.$apply();
    }, 1000);

    $scope.showInstructions = (function showInstructions() {
        return showinstructions;
    });

    $scope.showGame = (function showGame() {
        return showgame;
    });

    $scope.showResults = (function showResults() {
        return showresults;
    });

    $scope.showProblem = (function showProblem() {
        for (var i = 0; i < 4; i++) {
            nums.push((Math.floor(Math.random() * 100 % 50)) * 2);
        }
        nums[Math.floor(Math.random() * 100 % 4)]++;
        $scope.num1 = nums[0];
        $scope.num2 = nums[1];
        $scope.num3 = nums[2];
        $scope.num4 = nums[3];
        showinstructions = false;
        showgame = true;
    });

    $scope.checkAnswer = (function checkAnswer(answer) {
        showinstructions = false;
        showgame = false;
        showresults = true;
        clearInterval(timer);
        showAnswer(answer);
    });

    $scope.returnToDetect = (function returnToDetect() {
        window.location.href = "#/app/braingame";
    });

    function showAnswer(answer) {
        clearInterval(timer);
        $scope.yourAnswer = answer;
        var correctAnswer;
        for (var i = 0; i < 4; i++) {
            if (nums[i] % 2 == 1) {
                correctAnswer = nums[i];
            }
        }
        $scope.correctAnswer = correctAnswer;
        if (correctAnswer == answer) {
            load = true;
            var level = parseInt(Parse.User.current().get("Patterns"));
            Parse.User.current().set("Patterns", ++level);
            Parse.User.current().save(null, {
                success: function (user) {
                    load = false;
                    $scope.$apply();
                },
                error: function (error) {
                    alert(error.message);
                    load = false;
                    $scope.$apply();
                }
            });
        } else {
            $scope.visibility = "hidden";
        }
    }
})

.controller('Patterns1Ctrl', function ($scope) {
    var showinstructions = true;
    var showgame = false;
    var showresults = false;
    var nums = [];
    var load = false;

    $scope.loading = (function loading() {
        return load;
    });

    $scope.countdown = 10;
    var timer = setInterval(function () {
        if (showgame) {
            $scope.countdown--;
        }
        if ($scope.countdown == 0) {
            showinstructions = false;
            showgame = false;
            showresults = true;
            showAnswer(0);
        }
        $scope.$apply();
    }, 1000);

    $scope.showInstructions = (function showInstructions() {
        return showinstructions;
    });

    $scope.showGame = (function showGame() {
        return showgame;
    });

    $scope.showResults = (function showResults() {
        return showresults;
    });

    $scope.showProblem = (function showProblem() {
        for (var i = 0; i < 4; i++) {
            nums.push((Math.floor(Math.random() * 100 % 50)) * 7);
        }
        nums[Math.floor(Math.random() * 100 % 4)]++;
        $scope.num1 = nums[0];
        $scope.num2 = nums[1];
        $scope.num3 = nums[2];
        $scope.num4 = nums[3];
        showinstructions = false;
        showgame = true;
    });

    $scope.checkAnswer = (function checkAnswer(answer) {
        showinstructions = false;
        showgame = false;
        showresults = true;
        clearInterval(timer);
        showAnswer(answer);
    });

    $scope.returnToDetect = (function returnToDetect() {
        window.location.href = "#/app/braingame";
    });

    function showAnswer(answer) {
        clearInterval(timer);
        $scope.yourAnswer = answer;
        var correctAnswer;
        for (var i = 0; i < 4; i++) {
            if (nums[i] % 7 !== 0) {
                correctAnswer = nums[i];
            }
        }
        $scope.correctAnswer = correctAnswer;
        if (correctAnswer == answer) {
            load = true;
            var level = parseInt(Parse.User.current().get("Patterns"));
            Parse.User.current().set("Patterns", ++level);
            Parse.User.current().save(null, {
                success: function (user) {
                    load = false;
                    $scope.$apply();
                },
                error: function (error) {
                    alert(error.message);
                    load = false;
                    $scope.$apply();
                }
            });
        }
    }
})

.controller('Patterns2Ctrl', function ($scope) {

})

.controller('Patterns3Ctrl', function ($scope) {

})

.controller('Patterns4Ctrl', function ($scope) {

})

.controller('Patterns5Ctrl', function ($scope) {

})

.controller('Patterns6Ctrl', function ($scope) {

})

.controller('Patterns7Ctrl', function ($scope) {

})

/**MEMORY*/

.controller('Memory0Ctrl', function ($scope) {
    var showinstructions = true;
    var showgame = false;
    var showresults = false;
    var load = false;
    var length = 5;
    var simonTime = length*2;
    var simonNum = 9;
    var simonNums = [];
    var userNums = [];
    $scope.countdown = 10;
    var simon = setInterval(function () {
        if (!showgame)
            return;
        if (simonTime == 0) {
            clearInterval(simon);
            return;
        }
        if (simonNum == 9) {
            simonNum = Math.floor(Math.random() * 100 % 8);
            simonNums.push(simonNum);
            ChangeColor(simonNum, "blue");
        } else {
            ChangeColor(simonNum, "white");
            simonNum = 9;
        }
        simonTime--;
        $scope.$apply();
    }, 1000);

    var user = setInterval(function () {
        if (simonTime == 0)
            $scope.countdown--;
        if ($scope.countdown == 0) {
            showinstructions = false;
            showgame = false;
            showresults = true;
            checkAnswer();
        }
        $scope.$apply();
    }, 1000);

    $scope.changeColor = (function changeColor(color) {
        ChangeColor(color, "blue");
        userNums.push(parseInt(color));
        done();
        var click = setInterval(function () {
            ChangeColor(color, "white");
        }, 1);
    });

    $scope.returnToDetect = (function returnToDetect() {
        window.location.href = "#/app/braingame";
    });

    function done() {
        if (simonTime !== 0) {
            tooQuick();
            return;
        }
        if (userNums.length == simonNums.length) {
            clearInterval(user);
            checkAnswer();
        }
    }

    function tooQuick() {
        showinstructions = false;
        showgame = false;
        showresults = true;
        $scope.answer = "Wait until Simon is finished picking!";
    }

    function checkAnswer() {
        var correct = true;
        if (userNums.length !== simonNums.length)
            correct = false;
        for (var i = 0; i < userNums.length; i++) {
            if (userNums[i] !== simonNums[i])
                correct = false;
        }
        showinstructions = false;
        showgame = false;
        showresults = true;
        if (correct) {
            $scope.answer = "Great job! You got it!";
            load = true;
            var level = parseInt(Parse.User.current().get("Memory"));
            Parse.User.current().set("Memory", ++level);
            Parse.User.current().save(null, {
                success: function (user) {
                    load = false;
                    $scope.$apply();
                },
                error: function (error) {
                    alert(error.message);
                    load = false;
                    $scope.$apply();
                }
            });
        }
        else {
            $scope.answer = "You missed a couple. Try again!";
        }
    }

    function ChangeColor(button,color) {
        if (button == "0") {
            $scope.color0 = color;
        }
        if (button == "1") {
            $scope.color1 = color;
        }
        if (button == "2") {
            $scope.color2 = color;
        }
        if (button == "3") {
            $scope.color3 = color;
        }
        if (button == "4") {
            $scope.color4 = color;
        }
        if (button == "5") {
            $scope.color5 = color;
        }
        if (button == "6") {
            $scope.color6 = color;
        }
        if (button == "7") {
            $scope.color7 = color;
        }
        if (button == "8") {
            $scope.color8 = color;
        }
    }

    $scope.showProblem = (function showProblem() {
        showinstructions = false;
        showgame = true;
    });

    $scope.loading = (function loading() {
        return load;
    });

    $scope.showInstructions = (function showInstructions() {
        return showinstructions;
    });

    $scope.showGame = (function showGame() {
        return showgame;
    });

    $scope.showResults = (function showResults() {
        return showresults;
    });
})

.controller('Memory1Ctrl', function ($scope) {

})

.controller('Memory2Ctrl', function ($scope) {

})

.controller('Memory3Ctrl', function ($scope) {

})

.controller('Memory4Ctrl', function ($scope) {

})

.controller('Memory5Ctrl', function ($scope) {

})

.controller('Memory6Ctrl', function ($scope) {

})

.controller('Memory7Ctrl', function ($scope) {

})

/**REFLEX*/

.controller('Reflex0Ctrl', function ($scope) {

})

.controller('Reflex1Ctrl', function ($scope) {

})

.controller('Reflex2Ctrl', function ($scope) {

})

.controller('Reflex3Ctrl', function ($scope) {

})

.controller('Reflex4Ctrl', function ($scope) {

})

.controller('Reflex5Ctrl', function ($scope) {

})

.controller('Reflex6Ctrl', function ($scope) {

})

.controller('Reflex7Ctrl', function ($scope) {

})

/**COGNITION*/

.controller('Cognition0Ctrl', function ($scope) {

})

.controller('Cognition1Ctrl', function ($scope) {

})

.controller('Cognition2Ctrl', function ($scope) {

})

.controller('Cognition3Ctrl', function ($scope) {

})

.controller('Cognition4Ctrl', function ($scope) {

})

.controller('Cognition5Ctrl', function ($scope) {

})

.controller('Cognition6Ctrl', function ($scope) {

})

.controller('Cognition7Ctrl', function ($scope) {

});

function getUser() {
     Parse.User.logIn(device.uuid, device.uuid, {
        success: function (user) {
            console.log("logged in");
        },
        error: function (user, error) {
            createUser();
        }
     });
}

function createBeacon() {
    var region;
    var identifier = "BrainProject";
    var uuid = "b9407f30-f5f8-466e-aff9-25556b57fe6d";
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);
    return beaconRegion;
}

function createUser() {
    var user = new Parse.User();
    user.set("username", device.uuid);
    user.set("password", device.uuid);
    user.set("email", device.uuid + "@email.com");
    user.set("Patterns", 0);
    user.set("Cognition", 0);
    user.set("Reflex", 0);
    user.set("Memory", 0);
    user.signUp(null, {
        success: function (user) {
            console.log("created");
            GetUser();
        },
        error: function (user, error) {
            console.log("uh oh");
        }
    });
}