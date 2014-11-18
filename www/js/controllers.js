angular.module('poker.controllers', [])

.controller('HeaderCtrl', function ($scope, $ionicModal){
	$ionicModal.fromTemplateUrl('templates/info.html', {
		scope: $scope
	}).then(function(infoModal){
		$scope.infoModal = infoModal;
	});
	$ionicModal.fromTemplateUrl('templates/about.html', {
		scope: $scope
	}, {
        scope: $scope,
        animation: 'slide-in-right'
  }).then(function(aboutModal){
		$scope.aboutModal = aboutModal;
	});
		$scope.showAbout = function(){
		$scope.aboutModal.show();
	};
	$scope.closeAbout = function(){
		$scope.aboutModal.hide();
	};
	$scope.closeInfo = function(){
		$scope.infoModal.hide();
	};
	$scope.showInfo = function(){
		$scope.infoModal.show();
	};
})
.controller('SettingsCtrl', function($scope, $ionicModal,$stateParams, $location){
	$scope.CardsWithColors= JSON.parse(window.localStorage['CardsWithColors'] || '{}');
	$scope.save=function(){
		window.localStorage['CardsWithColors'] = JSON.stringify($scope.CardsWithColors);
		$location.path( '/' );
	}
function partition(arr, size) {
	
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
};

$scope.partitionedData = partition($scope.CardsWithColors, 4);
})
.controller('CardsCtrl', function($scope, $ionicModal,$stateParams, $location) {
	$scope.Cards = ['0','1/2','1','2','3','5','8','13','21','34','50','80','130','210','500','800', '?', 'C'];

	$scope.CardColors = ['71A7C9','89B93F','A7CD44','D1E073', 'F9F5A3', 'FAF491', 'EDED86', 'F8F05F', 'EEBE1B', 'FAAB41', 'F79920', 'F26922', 'F25E23', 'F04E23', 'E44926', '8B171B', '828282', 'A21D20'];
	$scope.CardsWithColors= [];
	for (var i=0;i<18; i++)
	{
		var card = {};
		card.text = $scope.Cards[i];
		card.color = $scope.CardColors[i];
		$scope.CardsWithColors.push(card);
	};
	if (window.localStorage['CardsWithColors'])
	{
		$scope.CardsWithColors= JSON.parse(window.localStorage['CardsWithColors'] || '{}');
	}
	else 
	{
		window.localStorage['CardsWithColors'] = JSON.stringify($scope.CardsWithColors);
	}
	function partition(arr, size) {
	
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
};
$scope.selectedCard = $stateParams;
$scope.partitionedData = partition($scope.CardsWithColors, 4);	

	$scope.go=function(path){
		$location.path( '/app/card/'+path );
	};
		$ionicModal.fromTemplateUrl('templates/card.html', {
		scope: $scope
	}, {
        scope: $scope,
        animation: 'slide-in-right'
  }).then(function(cardModal){
		$scope.cardModal = cardModal;
	});
	

	$scope.showCard = function(card){
		$scope.selectedCard = card;
		$scope.cardModal.show();
	};
	$scope.closeCard = function(){
		$scope.cardModal.hide();
	};

});