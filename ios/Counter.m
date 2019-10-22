//
//  Counter.m
//  bsStore
//
//  Created by Andrii Dashkovets on 21.10.2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Counter, NSObject)
RCT_EXTERN_METHOD(hi)
RCT_EXTERN_METHOD(encodeToBase64:(NSString *)inputString callback:(RCTResponseSenderBlock *)successCallback )
RCT_EXTERN_METHOD(decodeStringFromBase64:(NSString *)inputString callback:(RCTResponseSenderBlock *)successCallback )
@end
