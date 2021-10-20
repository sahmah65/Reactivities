﻿using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<ActivityDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccsseor;

            public Handler(DataContext context,IMapper mapper, IUserAccessor userAccsseor)
            {
                _context = context;
                _mapper = mapper;
               _userAccsseor = userAccsseor;
            }
            public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
                      new { currentUsername = _userAccsseor.GetUserName() })
                    .FirstOrDefaultAsync(x=>x.Id == request.Id);
                
                return Result<ActivityDto>.Success(activity);

            }
        }
    }
}
