using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
   public class Edit
    {
        public class Commmand : IRequest
        {
            public Activity Activity { set; get; }
        }
        public class Handler : IRequestHandler<Commmand>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context,IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Unit> Handle(Commmand request, CancellationToken cancellationToken)
            {

                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                _mapper.Map(request.Activity, activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
