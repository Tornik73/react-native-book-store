//
//  Counter.swift
//  bsStore
//
//  Created by Andrii Dashkovets on 21.10.2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import UIKit

extension String {

    func fromBase64() -> String? {
        guard let data = Data(base64Encoded: self) else {
            return nil
        }

        return String(data: data, encoding: .utf8)
    }

    func toBase64() -> String {
        return Data(self.utf8).base64EncodedString()
    }
}

@objc(Counter)
class Counter: NSObject{
  @objc
  static var currentString: String = ""
  static var currentDecodeString: String = ""
  
  @objc
  func hi(){
    print("hi");
  }
  
  @objc
  func encodeToBase64(_ inputString: NSString, callback successCallback: RCTResponseSenderBlock) -> Void{
    let str = inputString as String
    Counter.currentString = ""
    Counter.currentString = str.toBase64()
    successCallback([NSNull(), Counter.currentString])
  }
  
  @objc
  func decodeStringFromBase64(_ inputString: NSString, callback successCallback: RCTResponseSenderBlock) -> Void{
    let str = inputString as String
    Counter.currentDecodeString = ""
    Counter.currentDecodeString = str.fromBase64()!
    print(str.fromBase64()!)
    successCallback([NSNull(), Counter.currentDecodeString])
  }
}
