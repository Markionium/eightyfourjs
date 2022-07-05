/**
 * @fileoverview Custom rules used within People Experiences
 * @author Mark Polak
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import requireIndex from "requireindex";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

export const configs = requireIndex(__dirname + "/configs");

// import all rules in lib/rules
export const rules = requireIndex(__dirname + "/rules");
