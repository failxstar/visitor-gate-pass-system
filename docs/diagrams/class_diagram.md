classDiagram

class User {
id : Long
name : String
email : String
passwordHash : String
role : Role
createdAt : LocalDateTime
}

class Visitor {
id : Long
name : String
phone : String
idProofNumber : String
photoUrl : String
createdAt : LocalDateTime
}

class GatePass {
id : Long
purpose : String
validFrom : LocalDateTime
validTo : LocalDateTime
status : PassStatus
createdAt : LocalDateTime
}

class EntryLog {
id : Long
checkInTime : LocalDateTime
checkOutTime : LocalDateTime
entryPoint : String
}

class Blacklist {
id : Long
reason : String
createdAt : LocalDateTime
}

Visitor "1" --> "\*" GatePass : requests

User "1" --> "\*" GatePass : hosts

Visitor "1" --> "0..1" Blacklist : blacklisted

User "1" --> "\*" Blacklist : addedBy

GatePass "1" --> "\*" EntryLog : generates

User "1" --> "\*" EntryLog : loggedBy
