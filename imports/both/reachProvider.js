// /* This class contains all the logic to make ReachApp work.
// * It's referred to all over the code, mainly by use of the Provider package.
// * In some cases public properties of this class are accessed directly.
// */
// class PlanProvider with ChangeNotifier {
//     // Private properties
//     Map<String, double> _plan;
//     double _totalNetReach = 0.0;
//     double _locus = 0.0;
//     static List<String> _touchPoints = [
//       'advocacy',
//       'ambassador',
//       'app',
//       'asset',
//       'cinema',
//       'console_game',
//       'direct_mail',
//       'display',
//       'door_drop',
//       'internal_employee',
//       'event',
//       'experiential',
//       'e-mail',
//       'loyalty_crm',
//       'magazines',
//       'mobile',
//       'newspapers',
//       'outdoor',
//       'packaging',
//       'pr',
//       'promotion',
//       'shopper',
//       'radio',
//       'sem',
//       'seo',
//       'social',
//       'sponsorship',
//       'trade_fair',
//       'television',
//       'video_on_demand',
//       'viral',
//       'website',
//       'word_of_mouth',
//     ];
  
//     // Public properties
//     bool showAll = true;
//     bool sortingTouchPoints = true; // False means the sorting is done by reach
//     Color brandColor =
//         Colors.white; // Color of ReachApp logo upperleft. Changes on tap.
  
//   // Constructor, setting up a new plan, with all reach values at zero.
//     PlanProvider() {
//       _plan = Map.fromIterable(_touchPoints,
//           key: (element) => element, value: (element) => 0.0);
//     }
  
//     //Getters
//     Map<String, double> get plan {
//       return _plan;
//     }
  
//     double get totalNetReach {
//       return _totalNetReach;
//     }
  
//     double get locus {
//       return _locus;
//     }
  
//     // Check if reach for all touchpoints is 0
//     bool get planIsAllZeros {
//       return _plan.values.toList().every((entry) => entry == 0.0);
//     }
  
//     //Public methods
  
//     // User can input change reach for a touchpoint by use of a slider, or manually
//     void changeReachForTouchPoint(String touchPointName, double reach) {
//       _plan[touchPointName] = reach;
//       notifyListeners();
//     }
  
//     /* 1. First press on reset button (0), this function keeps the appearance of the touchpoints list in tact.
//     * It sets tha reach for all touchpoints back to 0.
//      */
//     void planToAllZeros() {
//       _plan = _plan.map((k, v) {
//         return MapEntry(k, 0.0);
//       });
//       _totalNetReach = 0.0;
//       _locus = 0.0;
//       notifyListeners();
//     }
  
//     /* 2. Second press on reset button (icon is now ⟲), constructs a complete new plan, in the original order.
//      *   All touchpoints are shown.
//     */
//     void reset() {
//       _plan = Map.fromIterable(_touchPoints,
//           key: (element) => element, value: (element) => 0.0);
//       _totalNetReach = 0.0;
//       _locus = 0.0;
//       notifyListeners();
//     }
  
//     void setShowAll(bool input) {
//       showAll = input;
//       notifyListeners();
//     }
  
//     void setSortingTouchPoints(bool input) {
//       sortingTouchPoints = input;
//       notifyListeners();
//     }
  
//     // Color of ReachApp logo upperleft. Changes on tap.
//     void setNextBrandColor(Color input) {
//       brandColor = input;
//       notifyListeners();
//     }
  
//     /* When sortingTouchPoints is true. Sorting button executes this function, which sorts the plan alphabetically.
//     * Going up, according to displayName. Because of this it's a pretty long function.
//     */
//     void sortTouchPoints(BuildContext context) {
//       //Make dictionary list with translations to locale
//       List<MapEntry<String, String>> dictionary = Map.from(_plan)
//           .map((k, v) {
//             return MapEntry<String, String>(
//                 k, PlanLocalizations.of(context).displayName(k));
//           })
//           .entries
//           .toList();
//       //Sort dictionary List according to displayName
//       dictionary.sort((MapEntry<String, String> a, MapEntry<String, String> b) {
//         return a.value.compareTo(b.value);
//       });
//       //Make a sorted plan Map out of sorted dictionary List and use values of the original _plan
//       Map<String, double> sortedPlan = Map.fromEntries(dictionary).map((k, v) {
//         return MapEntry(k, _plan[k]);
//       });
//       // Store sorted plan Map in _plan variable
//       _plan = sortedPlan;
//       notifyListeners();
//     }
  
//   /* When sortingTouchPoints is false. Sorting button executes this function, which sorts the plan according to reach.
//     * Going down.
//     */
//     void sortReach() {
//       var entries = _plan.entries.toList();
//       entries.sort((MapEntry<String, double> a, MapEntry<String, double> b) =>
//           b.value.compareTo(a.value));
//       _plan = Map<String, double>.fromEntries(entries);
//       notifyListeners();
//     }
  
//     // Hide the touchpoints in the plan, where reach == 0
//     void removeZeros() {
//       _plan.removeWhere((key, value) => value == 0.0);
//       notifyListeners();
//     }
  
//   // Insert touchpoints with reach == 0 back into the plan
//     void replenishPlan() {
//       for (String touchPointName in _touchPoints) {
//         if (!_plan.containsKey(touchPointName)) {
//           _plan[touchPointName] = 0.0;
//         }
//       }
//       notifyListeners();
//     }
  
//   // Execute result calculations and notify relevant widgets of result.
//     void calculateResults() {
//       _calculateTotalNetReach();
//       _calculateLocus();
//       notifyListeners();
//     }
  
//     //Private methods
//     void _calculateTotalNetReach() {
//       double totalReachPortion = 0.0;
//       for (String touchPointName in _plan.keys.toList()) {
//         double r = _plan[touchPointName] / 100;
//         totalReachPortion = totalReachPortion + ((1 - totalReachPortion) * r);
//       }
//       _totalNetReach = 100 * totalReachPortion;
//     }
  
//     void _calculateLocus() {
//       double duplicateReachPortion = 0.0;
//       for (String touchPointName in _plan.keys.toList()) {
//         if (_plan[touchPointName] != 0.0 && duplicateReachPortion != 0.0) {
//           double r = _plan[touchPointName] / 100;
//           duplicateReachPortion *= r;
//         }
//         if (_plan[touchPointName] != 0 && duplicateReachPortion == 0) {
//           duplicateReachPortion = _plan[touchPointName] / 100;
//         }
//       }
//       _locus = 100 * duplicateReachPortion;
//     }
//   }
  