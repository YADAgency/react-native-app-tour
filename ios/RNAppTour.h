
#import <React/RCTUIManager.h>
@import MaterialShowcase;

@interface MutableOrderedDictionary<__covariant KeyType, __covariant ObjectType> : NSDictionary<KeyType, ObjectType>
@end

@interface RNAppTour : NSObject<RCTBridgeModule, MaterialShowcaseDelegate> {
    MutableOrderedDictionary *targets;
}

@property (nonatomic, weak) id <MaterialShowcaseDelegate> delegate;

@end
