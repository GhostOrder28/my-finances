db.getCollection("sales").findOneAndUpdate(
    {
        _id: ObjectId('63ac6f242e5fe02ddaee616b')    },
    
    [
      {
        $set: {
          payments: {
            $filter: {
              input: '$payments',
              as: 'payment',
              cond: { $ne: [ '$$payment._id', ObjectId('63ac784d63673388ce47ff99') ] }            }          },
          totalPaidAmount: {
            $subtract: [
              '$totalPaidAmount',
              {
                $getField: {
                  input: {
                    $first: {
                      $filter: {
                        input: '$payments',
                        cond: { $eq: [ '$$this._id', ObjectId('63ac784d63673388ce47ff99') ] }                      }                    }                  },
                  field: 'paidAmount'                }                
              } 
            ]
          },        }      },
    ],
    
    {
        new: true    }
)
